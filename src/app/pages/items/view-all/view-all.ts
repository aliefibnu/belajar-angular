import { Component, inject, OnInit, signal } from '@angular/core';
import { ItemsService } from '../items.service';
import { Router } from '@angular/router';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-view-all',
  imports: [],
  templateUrl: './view-all.html',
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

  deleteItem(id: number): void {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      this.itemServ.delete(id).subscribe({
        next: () => {
          const currentItems = this.items();
          this.itemServ.items.set(currentItems.filter((item) => item.id !== id));

          Notify.success('Item berhasil dihapus');
        },
        error: (err) => {
          console.error('Error deleting item:', err);
          Notify.failure('Gagal menghapus item');
        },
      });
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/items/create']);
  }
}
