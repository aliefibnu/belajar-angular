import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-items',
  imports: [RouterOutlet],
  templateUrl: './items.html',
})
export class ItemsLayout {
  router = inject(Router);
  navigateToCreate(): void {
    this.router.navigate(['/items/create']);
  }
}
