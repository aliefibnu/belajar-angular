import { Routes } from '@angular/router';
import { rootGuard } from './guards/root-guard';
import { rootRoutes } from './root.routes';
import { authRoutes } from './auth.routes';
import { authGuard } from './guards/auth-guard';
import { userGuard } from './guards/user-guard';
import { userRoutes } from './user.routes';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [rootGuard],
    children: rootRoutes,
  },
  {
    path: 'auth',
    canActivateChild: [authGuard],
    children: authRoutes,
  },
  {
    path: 'user',
    canActivateChild: [userGuard],
    children: userRoutes,
  },
];
