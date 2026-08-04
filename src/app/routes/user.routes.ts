import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('../pages/user/profile/profile').then((p) => p.ProfilePage),
  },
  {
    path: 'update-profile',
    loadComponent: () =>
      import('../pages/user/update-profile/update-profile').then((p) => p.UpdateProfilePage),
  },
];
