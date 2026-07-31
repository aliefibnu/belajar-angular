import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { AuthStore } from './store/auth.store';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  imports: [RouterOutlet, Navbar],
})
export class App implements OnInit {
  authStore = inject(AuthStore);

  ngOnInit(): void {
    this.authStore.load();
  }
}
