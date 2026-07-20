import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CounterPage } from './counter/counter';
import { TodolistPage } from './todolist/todolist';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'counter',
    component: CounterPage,
  },
  {
    path: 'todolist',
    component: TodolistPage,
  },
];
