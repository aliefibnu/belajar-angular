import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideMapPin,
  lucidePhone,
  lucideGlobe,
  lucideCalendar,
  lucideShield,
  lucideClock,
  lucideUser,
  lucideHash,
  lucideCheckCircle2,
  lucideXCircle,
  lucideInfo,
  lucidePencil,
  lucideAtSign,
} from '@ng-icons/lucide';
import { AuthStore } from '../../../store/auth.store';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, RouterLink, NgIcon],
  templateUrl: './profile.html',
  providers: [
    provideIcons({
      lucideMail,
      lucideMapPin,
      lucidePhone,
      lucideGlobe,
      lucideCalendar,
      lucideShield,
      lucideClock,
      lucideUser,
      lucideHash,
      lucideCheckCircle2,
      lucideXCircle,
      lucideInfo,
      lucidePencil,
      lucideAtSign,
    }),
  ],
})
export class ProfilePage {
  authStore = inject(AuthStore);
  date = Date;

  formatGender(value: string | undefined): string {
    if (!value) return '—';
    switch (value) {
      case 'male':
        return 'Laki-laki';
      case 'female':
        return 'Perempuan';
      case 'other':
        return 'Lainnya';
      default:
        return '—';
    }
  }
}
