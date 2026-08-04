import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

export const userGuard: CanActivateFn = async (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  !authStore.user() && (await authStore.load());
  if (!authStore.user()) return router.parseUrl('/auth/login');

  return true;
};
