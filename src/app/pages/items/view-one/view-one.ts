import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService, ResponseItem } from '../items.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideEdit, lucideImage } from '@ng-icons/lucide';

@Component({
  selector: 'app-view-one',
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-one.html',
  providers: provideIcons({ lucideImage, lucideArrowLeft, lucideEdit }),
})
export class ViewOneItemPage implements OnInit {
  private readonly itemService = inject(ItemsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  loading = signal(true);
  error = signal<string | null>(null);
  item = signal<Item | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.loading.set(false);
      this.error.set('ID item tidak valid.');
      return;
    }

    this.itemService.getById(id).subscribe({
      next: (response) => {
        this.item.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading item:', err);
        this.error.set('Gagal memuat detail item. Silakan coba lagi.');
        this.loading.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/items']);
  }

  editItem(): void {
    const currentItem = this.item();

    if (!currentItem) {
      return;
    }

    this.router.navigate([`/items/${currentItem.id}/edit`]);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}

type Item = ResponseItem['data'][0];
