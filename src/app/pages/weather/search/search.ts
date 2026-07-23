import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { catchError, filter, map, of } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [NgIcon, ReactiveFormsModule],
  providers: provideIcons({ lucideSearch }),
  templateUrl: './search.html',
})
export class SearchWeatherPage {
  formControlGroup = new FormGroup({
    search: new FormControl(''),
  });
  http = inject(HttpClient);

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

  constructor() {
    effect(() => {
      this.countries() && console.log(this.countries());
    });
  }

  onSubmit() {
    console.log(this.formControlGroup.get('search')?.value);
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
