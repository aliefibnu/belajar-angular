import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { CounterPage } from './pages/counter/counter';
import { TodolistPage } from './pages/todolist/todolist';
import { WeatherPage } from './pages/weather/weather';
import { SearchWeatherPage } from './pages/weather/search/search';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'counter',
    component: CounterPage,
  },
  {
    path: 'todolist',
    component: TodolistPage,
  },
  {
    path: 'weather',
    children: [
      {
        path: '',
        component: WeatherPage,
      },
      {
        path: 'search',
        component: SearchWeatherPage,
      },
    ],
  },
];
