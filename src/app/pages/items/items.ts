import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
  selector: 'app-items',
  imports: [RouterOutlet, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './items.html',
  providers: provideIcons({ lucidePlus }),
})
export class ItemsLayout {
  router = inject(Router);
  navigateToCreate(): void {
    this.router.navigate(['/items/create']);
  }
}
