import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
})
export class InfoPages implements OnInit {
  http = inject(HttpClient);
  data = signal<WeatherRes>(null);

  constructor() {
    effect(() => console.log(this.data()));
  }

  ngOnInit(): void {
    this.http.get<WeatherRes>('/weather-api/batam?format=j1').subscribe({
      next: (res) => this.data.set(res),
      error: (e: HttpErrorResponse) => Notify.failure(e.message),
    });
  }

  get currentCond() {
    return this.data()?.current_condition?.[0];
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
    // weatherDesc: Array [ {…} ],
    // weatherIconUrl: Array [ {…} ],
    winddirDegree: string;
    windspeedKmph: string;
  }[];
} | null;
