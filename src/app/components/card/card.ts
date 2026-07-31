import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye } from '@ng-icons/lucide';

@Component({
  selector: 'card',
  imports: [CommonModule, NgIcon],
  providers: provideIcons({ lucideEye }),
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.html',
})
export class Card {
  @Input() cardData: {
    title: string;
    value: string | number;
    description?: string;
    link?: string;
  } = {
    title: 'Total Pendapatan',
    value: 'Rp 15.000.000',
  };
}
