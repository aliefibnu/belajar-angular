import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from '../../../components/loader/loader';
import { Card } from '../../../components/card/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleArrowUp, lucideClock } from '@ng-icons/lucide';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, filter, of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  imports: [Loader, Card, NgIcon],
  providers: provideIcons({ lucideCircleArrowUp }),
  templateUrl: './info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPages {
  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);
  city = signal(this.activatedRoute.snapshot.params['city']);
  timeZoneHour = signal(0);
  data = toSignal(
    !this.city()
      ? this.http.get<{ city: string }>('https://ipwho.is').pipe(
          filter((ipData) => !!ipData.city),
          switchMap((ipdata) => {
            this.city.update((c) => ipdata.city);
            return this.http.get<WeatherRes>(`/weather/${ipdata.city}?format=j1`);
          }),
          catchError((err: HttpErrorResponse) => {
            Notify.failure(err.message);
            return of(null);
          }),
        )
      : this.http.get<WeatherRes>(`/weather/${this.city()}?format=j1`),
  );

  constructor() {
    effect(() => {
      this.city() &&
        this.http
          .get<{ results: { timezone: string }[] }>(
            'https://geocoding-api.open-meteo.com/v1/search?name=' + this.city(),
          )
          .pipe(filter((res) => !!res.results))
          .subscribe((res) => {
            const parsed = parseInt(this.getUTCOffset(res.results[0].timezone)?.slice(3) ?? '7');
            this.timeZoneHour.set(parsed);
          });
    });
  }

  currentCond = computed(() => this.data()?.current_condition?.[0]);
  nearestArea = computed(() => this.data()?.nearest_area?.[0]);

  ubahWaktu(waktuString: string) {
    const [waktu, periode] = waktuString.split(' ');
    const tanggal = new Date();
    let [jam, menit] = waktu.split(':').map(Number);

    if (periode === 'PM' && jam !== 12) jam += 12;
    if (periode === 'AM' && jam === 12) jam = 0;

    tanggal.setHours(jam, menit, 0, 0);
    tanggal.setHours(tanggal.getHours() + this.timeZoneHour());

    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return formatter.format(tanggal);
  }

  getUTCOffset(timeZone: string) {
    const now = new Date();

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
    });

    const parts = formatter.formatToParts(now);

    return parts.find((p) => p.type === 'timeZoneName')?.value;
  }
}

type WeatherRes = {
  current_condition: {
    FeelsLikeC: string;
    cloudcover: string;
    humidity: string;
    observation_time: string;
    temp_C: string;
    uvIndex: string;
    visibility: string;
    winddirDegree: string;
    windspeedKmph: string;
    weatherDesc: { value: string }[];
    weatherIconUrl: { value: string }[];
  }[];
  nearest_area: {
    areaName: {
      value: string;
    }[];
    country: {
      value: string;
    }[];
    latitude: string;
    longitude: string;
    population: string;
    region: {
      value: string;
    }[];
    weatherUrl: {
      value: string;
    }[];
  }[];
} | null;
