import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideLogIn,
  lucideLogOut,
  lucideUser,
  lucideUserCircle2,
  lucideUserPlus,
} from '@ng-icons/lucide';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { AuthStore } from '../../../store/auth.store';

@Component({
  selector: 'app-auth-menu',
  imports: [NgIcon, RouterLink],
  templateUrl: './auth-menu.html',
  providers: provideIcons({
    lucideUserCircle2,
    lucideLogIn,
    lucideUserPlus,
    lucideUser,
    lucideLogOut,
  }),
})
export class AuthMenu {
  authStore = inject(AuthStore);
  router = inject(Router);
  user = this.authStore.user;

  onLogout(): void {
    Confirm.show(
      'Keluar dari Akun',
      'Apakah Anda yakin ingin keluar dari akun?',
      'Ya, Keluar',
      'Batal',
      async () => {
        await this.authStore.logout();
        this.router.navigate(['/auth/login']);
      },
      () => {},
      {
        okButtonBackground: '#ef4444',
        okButtonColor: '#ffffff',
        cancelButtonBackground: '#f3f4f6',
        cancelButtonColor: '#374151',
        titleColor: '#111827',
        messageColor: '#4b5563',
        borderRadius: '12px',
        fontFamily: 'Inter, system-ui, sans-serif',
        cssAnimationStyle: 'zoom',
      },
    );
  }
}
