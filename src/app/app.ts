import { Component, computed, signal } from '@angular/core';
import { CustomButton } from './custom-button/custom-button';
import { Counter } from './counter/counter';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Counter],
})
export class App {}
