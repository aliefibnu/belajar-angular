import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ItemsService, ResponseItem } from '../items.service';
import { Router } from '@angular/router';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideEdit,
  lucideEye,
  lucideFile,
  lucideMessageCircleWarning,
  lucideTrash2,
} from '@ng-icons/lucide';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

@Component({
  selector: 'app-view-all',
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-all.html',
  providers: provideIcons({
    lucideEye,
    lucideTrash2,
    lucideMessageCircleWarning,
    lucideFile,
    lucideEdit,
  }),
})
export class ViewAllItemsPage implements OnInit {
  itemServ = inject(ItemsService);
  router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  items = this.itemServ.items;

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading.set(true);
    this.error.set(null);

    this.itemServ.getAll().subscribe({
      next: (res) => {
        this.itemServ.items.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.error.set('Gagal memuat data items. Silakan coba lagi.');
        this.loading.set(false);
      },
    });
  }

  editItem(id: number): void {
    this.router.navigate([`/items/${id}/edit`]);
  }

  viewItem(id: number): void {
    this.router.navigate([`/items/${id}/view`]);
  }

  deleteItem(item: ResponseItem['data'][0]): void {
    Confirm.show(
      'HAPUS ITEM',
      `Apakah anda yakin akan menghapus item ${item.name}?`,
      'Ya, Hapus !',
      'Batal',
      () => {
        this.itemServ.delete(item.id).subscribe({
          next: () => {
            const currentItems = this.items();
            this.itemServ.items.set(currentItems.filter((i) => i.id !== item.id));

            Notify.success('Item berhasil dihapus');
          },
          error: (err) => {
            console.error('Error deleting item:', err);
            Notify.failure('Gagal menghapus item');
          },
        });
      },
      () => {},
      {
        okButtonBackground: 'oklch(57.7% 0.245 27.325) ',
        okButtonColor: 'white',
        titleColor: 'oklch(57.7% 0.245 27.325) ',
      },
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/items/create']);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
