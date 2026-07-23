import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFan } from '@ng-icons/lucide';

@Component({
  selector: 'app-loader',
  imports: [],
  styleUrl: 'loader.css',
  providers: provideIcons({ lucideFan }),
  templateUrl: './loader.html',
})
export class Loader {
  char = '-';
  dot = signal(this.char);
  constructor() {
    setInterval(() => {
      if (this.dot().length === 5) return this.dot.set('');
      this.dot.update((v) => v + this.char);
    }, 300);
  }
}
