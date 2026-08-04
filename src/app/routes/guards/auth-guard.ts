import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

export const authGuard: CanActivateChildFn = async (childRoute, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  !authStore.user() && (await authStore.load());
  if (authStore.user()) return router.parseUrl('/user/profile');

  return true;
};
