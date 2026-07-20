import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  routes = routes.map(
    ({ path }) => ((path?.charAt(0).toUpperCase() as string) + path?.slice(1)) as string,
  );
}
