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
        path: 'search',
        loadComponent: () =>
          import('./pages/weather/search/search').then((p) => p.SearchWeatherPage),
      },
      {
        path: ':city',
        loadComponent: () => import('./pages/weather/info/info').then((p) => p.InfoPages),
      },
      {
        path: '',
        loadComponent: () => import('./pages/weather/info/info').then((p) => p.InfoPages),
      },
    ],
  },
  {
    path: 'items',
    loadComponent: () => import('./pages/items/items').then((p) => p.ItemsLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/items/view-all/view-all').then((p) => p.ViewAllItemsPage),
      },
      {
        path: ':id/view',
        loadComponent: () =>
          import('./pages/items/view-one/view-one').then((p) => p.ViewOneItemPage),
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./pages/items/edit/edit').then((p) => p.EditItemPage),
      },
      {
        path: 'create',
        loadComponent: () => import('./pages/items/create/create').then((p) => p.CreateItemPage),
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/auth/auth').then((p) => p.AuthLayout),
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then((p) => p.LoginPage),
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/auth/signup/signup').then((p) => p.SignupPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/auth/profile/profile').then((p) => p.ProfilePage),
      },
      {
        path: 'update-profile',
        loadComponent: () =>
          import('./pages/auth/update-profile/update-profile').then((p) => p.UpdateProfilePage),
      },
    ],
  },
];
