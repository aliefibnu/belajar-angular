import { inject, Service, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../pages/auth/auth.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Service()
export class AuthStore {
  authServ = inject(AuthService);
  loaded = signal(false);

  user = signal<User | null>(null);

  async load(): Promise<void> {
    if (this.loaded()) return;
    try {
      const { data } = await this.authServ.getUser();
      if (!data.user) return;

      this.user.set(data.user);
    } catch (error) {
      Notify.failure(error + '');
    }
  }

  async refetch() {
    this.loaded.set(false);
    await this.load();
  }

  async logout(): Promise<void> {
    try {
      const { error } = await this.authServ.logout();
      if (error) {
        Notify.failure(error.message);
        return;
      }
      this.user.set(null);
      this.loaded.set(false);
      Notify.success('Berhasil keluar dari akun.');
    } catch (error) {
      Notify.failure('Gagal keluar dari akun.');
    }
  }
}
