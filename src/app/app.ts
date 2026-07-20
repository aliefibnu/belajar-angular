import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  count = signal(0);
  increment() {
    this.count.update((v) => v + 1);
  }
  dobel = () => this.count.update((v) => v * 2);
  double = computed(() => this.count() * 2);
}
