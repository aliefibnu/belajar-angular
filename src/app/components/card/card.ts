import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  imports: [CommonModule],
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
