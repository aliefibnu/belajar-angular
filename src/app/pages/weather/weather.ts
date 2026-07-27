import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCloudSun, lucideSearch } from '@ng-icons/lucide';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [NgIcon, RouterLink, RouterOutlet, RouterLinkActive, NgClass],
  providers: provideIcons({ lucideCloudSun, lucideSearch }),
  templateUrl: './weather.html',
})
export class WeatherLayout {
  router = inject(Router);
}
