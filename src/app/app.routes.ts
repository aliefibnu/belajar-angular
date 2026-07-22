import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((p) => p.HomePage),
  },
  {
    path: 'counter',
    loadComponent: () => import('./pages/counter/counter').then((p) => p.CounterPage),
  },
  {
    path: 'todolist',
    loadComponent: () => import('./pages/todolist/todolist').then((p) => p.TodolistPage),
  },
  {
    path: 'weather',
    loadComponent: () => import('./pages/weather/weather').then((p) => p.WeatherLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/counter/counter').then((p) => p.CounterPage),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./pages/weather/search/search').then((p) => p.SearchWeatherPage),
      },
    ],
  },
];
