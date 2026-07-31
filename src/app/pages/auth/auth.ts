import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn, lucideUserPlus, lucideShield } from '@ng-icons/lucide';

@Component({
  selector: 'app-auth',
  imports: [RouterLink, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth.html',
  providers: [provideIcons({ lucideLogIn, lucideUserPlus, lucideShield })],
})
export class AuthLayout {}
