import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, RouterModule],
})
export class App {
  routes = routes.map(
    ({ path }) => ((path?.charAt(0).toUpperCase() as string) + path?.slice(1)) as string,
  );
}
