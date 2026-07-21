import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CustomButton } from '../custom-button/custom-button';

@Component({
  selector: 'app-counter',
  imports: [CustomButton],
  templateUrl: './counter.html',
})
export class CounterPage {
  count = signal(0);
  increment() {
    this.count.update((v) => v + 1);
  }
  dobel = () => this.count.update((v) => v * 2);
  kurangi = () => this.count.update((v) => v - 1);
  reset = () => this.count.update((v) => 0);
  double = computed(() => this.count() * 2);
}
