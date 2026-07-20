import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CounterPage } from './counter/counter';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'counter',
    component: CounterPage,
  },
];
