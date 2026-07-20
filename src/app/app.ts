import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, Navbar],
})
export class App {}
