import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCloudSun,
  lucideMapPinSearch,
  lucideMinusCircle,
  lucideSearch,
} from '@ng-icons/lucide';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { catchError, filter, map, of } from 'rxjs';
import { Loader } from '../../../components/loader/loader';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [NgIcon, ReactiveFormsModule, Loader, RouterLink],
  providers: provideIcons({ lucideSearch, lucideMapPinSearch, lucideCloudSun, lucideMinusCircle }),
  templateUrl: './search.html',
})
export class SearchWeatherPage {
  formControlGroup = new FormGroup({
    search: new FormControl(''),
  });
  http = inject(HttpClient);
  searchVal = signal(this.formControlGroup.get('search')?.value);
  selectedCountry = signal({
    name: '',
    id: 0,
  });

  cities = signal<City[] | null>(null);

  constructor() {
    effect(() => {
      if (this.selectedCountry().name == '') return;
      this.searchVal()
        ? this.http
            .get<{ status: number; cities: City[] }>(
              `https://csc.sidsworld.co.in/api/citiesByCountry/${this.selectedCountry().id}/search/${this.searchVal()}`,
            )
            .pipe(
              filter((data) => !!data.cities),
              map((res) => res.cities),
              catchError((e: HttpErrorResponse) => {
                if (e.status != 404) Notify.failure(e.message);
                if (e.status == 404) Notify.failure('Kota Tidak Terdaftar');
                return of(null);
              }),
            )
            .subscribe((citydata) => this.cities.set(citydata))
        : this.http
            .get<{ status: number; cities: { data: City[] } }>(
              `https://csc.sidsworld.co.in/api/citiesByCountry/${this.selectedCountry().id}`,
            )
            .pipe(
              filter((data) => !!data.cities.data),
              map((res) => res.cities),
              catchError((e: HttpErrorResponse) => {
                if (e.status != 404) Notify.failure(e.message);
                if (e.status == 404) Notify.failure('Kota Tidak Terdaftar');
                return of(null);
              }),
            )
            .subscribe((citydata) => this.cities.set(citydata?.data ?? null));
    });
  }

  countries = toSignal(
    this.http
      .get<{ countries: Country[]; status: number }>('https://csc.sidsworld.co.in/api/countries')
      .pipe(
        filter((data) => !!data.countries),
        map((data) => data.countries),
        catchError((e: HttpErrorResponse) => {
          Notify.failure(e.message);
          return of(null);
        }),
      ),
  );

  filteredCountries = computed(() =>
    this.countries()?.filter((country) =>
      country.name.toLowerCase().includes((this.searchVal() ?? '').toLowerCase()),
    ),
  );

  onSubmit() {
    this.searchVal.set(this.formControlGroup.get('search')?.value ?? '');
  }

  setSelectedCountry({ name, id }: { name: string; id: number }) {
    this.searchVal.set('');
    this.selectedCountry.set({ name, id });
  }
}

type Country = {
  id: number;
  name: string;
  iso3: string;
  numeric_code: string;
  iso2: string;
  phonecode: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: 3;
  subregion: string;
  subregion_id: 14;
  nationality: string;
  timezones: string;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
  created_at: string;
  updated_at: string;
  flag: 1;
  wikiDataId: string;
};

type City = {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  country_id: number;
  country_code: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
  flag: number;
  wikiDataId: string;
  state: {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    fips_code: string;
    iso2: string;
    type: string;
    latitude: string;
    longitude: string;
    created_at: string;
    updated_at: string;
    flag: number;
    wikiDataId: string;
  };
};
