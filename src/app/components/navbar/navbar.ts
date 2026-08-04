import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { routes } from '../../routes/app.routes';
import { RouterModule } from '@angular/router';
import { AuthMenu } from './auth-menu/auth-menu';
import { excludedUrl as excludedUrlRootGuard } from '../../routes/guards/root-guard';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, AuthMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
})
export class Navbar {
  unguardedRootRoutes = excludedUrlRootGuard;
  authStore = inject(AuthStore);
  user = this.authStore.user;

  routes = routes.map(({ children }) =>
    children?.map(
      ({ path }) => ((path?.charAt(0).toUpperCase() as string) + path?.slice(1)) as string,
    ),
  )[0];
}
