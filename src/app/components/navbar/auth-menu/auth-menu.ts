import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideLogIn,
  lucideLogOut,
  lucideUser,
  lucideUserCircle2,
  lucideUserPlus,
} from '@ng-icons/lucide';
import { AuthStore } from '../../../store/auth.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-menu',
  imports: [NgIcon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  user = this.authStore.user;
  routes = {
    guest: ['lucideLogIn:Login', 'lucideUserPlus:Signup'],
    user: ['lucideUser:Profile', 'lucideLogOut:Log Out'],
  };
}
