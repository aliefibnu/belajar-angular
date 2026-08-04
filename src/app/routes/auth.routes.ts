import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/auth/auth').then((p) => p.AuthLayout),
  },
  {
    path: 'login',
    loadComponent: () => import('../pages/auth/login/login').then((p) => p.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('../pages/auth/signup/signup').then((p) => p.SignupPage),
  },
];
