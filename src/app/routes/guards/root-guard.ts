import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';
import { tryBypassGuard } from '../../utils/url';

export const excludedUrl = ['/', '/todolist', '/counter'];

export const rootGuard: CanActivateFn = async (route, state) => {
  if (tryBypassGuard(excludedUrl, state)) return true;

  const authStore = inject(AuthStore);
  const router = inject(Router);

  !authStore.user() && (await authStore.load());
  if (!authStore.user()) return router.parseUrl('auth/login');

  return true;
};
