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

@Component({
  selector: 'app-info',
  imports: [Loader, Card, NgIcon],
  providers: provideIcons({ lucideCircleArrowUp }),
  templateUrl: './info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPages {
  http = inject(HttpClient);
  city = signal('');
  data = toSignal(
    this.http.get<{ city: string }>('https://ipwho.is').pipe(
      filter((ipData) => !!ipData.city),
      switchMap((ipdata) => {
        this.city.update((c) => ipdata.city);
        return this.http.get<WeatherRes>(
          `https://tryng-alief.vercel.app/api/weather/${ipdata.city}?format=j1`,
        );
      }),
      catchError((err: HttpErrorResponse) => {
        Notify.failure(err.message);
        return of(null);
      }),
    ),
  );

  currentCond = computed(() => this.data()?.current_condition?.[0]);

  ubahWaktu(waktuString: string) {
    const [waktu, periode] = waktuString.split(' ');
    const tanggal = new Date();
    let [jam, menit] = waktu.split(':').map(Number);

    if (periode === 'PM' && jam !== 12) jam += 12;
    if (periode === 'AM' && jam === 12) jam = 0;

    tanggal.setHours(jam, menit, 0, 0);
    tanggal.setHours(tanggal.getHours() + 7);

    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return formatter.format(tanggal);
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
} | null;
