import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMapPinSearch, lucideSearch } from '@ng-icons/lucide';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { catchError, filter, map, of } from 'rxjs';
import { Loader } from '../../../components/loader/loader';

@Component({
  selector: 'app-search',
  imports: [NgIcon, ReactiveFormsModule, Loader],
  providers: provideIcons({ lucideSearch, lucideMapPinSearch }),
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

  countries = toSignal(
    this.selectedCountry().name == ''
      ? this.http
          .get<{ countries: Country[]; status: number }>(
            'https://csc.sidsworld.co.in/api/countries',
          )
          .pipe(
            filter((data) => !!data.countries),
            map((data) => data.countries),
            catchError((e: HttpErrorResponse) => {
              Notify.failure(e.message);
              return of(null);
            }),
          )
      : this.http
          .get<{ countries: Country[]; status: number }>(
            `/api/citiesByCountry/${this.selectedCountry().id}`,
          )
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
