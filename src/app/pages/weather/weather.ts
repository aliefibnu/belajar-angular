import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Card } from '../../components/card/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCloudSun, lucideSearch } from '@ng-icons/lucide';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [Card, NgIcon, RouterLink, RouterOutlet, RouterLinkActive, NgClass],
  providers: provideIcons({ lucideCloudSun, lucideSearch }),
  templateUrl: './weather.html',
})
export class WeatherLayout {}
