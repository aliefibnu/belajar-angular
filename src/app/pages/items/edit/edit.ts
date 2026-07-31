import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { filter, map } from 'rxjs';
import { ItemsService, ResponseItem } from '../items.service';
import { Loader } from '../../../components/loader/loader';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeftFromLine, lucideSend, lucideUpload } from '@ng-icons/lucide';
import { FormUtil } from '../../../utils/form.util';

@Component({
  selector: 'app-edit',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, Loader, NgIcon],
  providers: provideIcons({ lucideArrowLeftFromLine, lucideSend, lucideUpload }),
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit.html',
})
export class EditItemPage {
  http = inject(HttpClient);
  itemsService = inject(ItemsService);
  router = inject(Router);
  formUtil = inject(FormUtil);
  activatedRoute = inject(ActivatedRoute);
  previewUrl = signal<string | null>(null);
  fileName = signal<string>('Belum ada !');

  thisItem = toSignal(
    this.itemsService.getById(this.activatedRoute.snapshot.params['id']).pipe(
      filter((data) => !!data.data),
      map(({ data }) => data),
    ),
  );

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    description: new FormControl('', [Validators.minLength(6), Validators.required]),
    image: new FormControl<File | null>(null),
  });

  constructor() {
    effect(() => {
      const item = this.thisItem();
      if (!item) return;

      this.formGroup.patchValue({
        name: item.name,
        description: item.description,
      });

      item.image_path && this.previewUrl.set(item.image_path);
      item.image_path && this.fileName.set('Default (Tidak Diganti)');
    });
  }

  onSubmit() {
    this.formUtil
      .getFormValidationErrors(this.formGroup)
      .then(() => {
        const { name, description, image } = this.formGroup.getRawValue();
        const id = this.activatedRoute.snapshot.params['id'];
        const formData = new FormData();
        name && formData.append('name', name);
        description && formData.append('description', description);
        image && formData.append('image', image);

        this.itemsService.update(id, formData).subscribe({
          next: () => {
            Notify.success('Berhasil mengubah item!');
            this.router.navigate(['items']);
          },
          error: ({ error }) => Notify.failure(error.errors),
        });
      })
      .catch((errors) => errors.forEach((err: string) => Notify.failure(err)));
  }

  getBlobUrl(file: File | null | undefined) {
    if (!file) return null;
    return URL.createObjectURL(file);
  }

  onFileChange(event: Event) {
    let file: FileList | File | null = (event.target as HTMLInputElement).files;

    if (!file) return;
    file = file[0];

    if (!file?.type.startsWith('image/')) return Notify.failure('Hanya Boleh Mengupload Gambar !');

    if (file?.size > 5 * 1024 * 1024)
      return Notify.failure('Hanya Boleh Mengupload Gambar Dibawah 5MB !');

    this.formGroup.patchValue({ image: file });
    this.previewUrl.set(this.getBlobUrl(file));
    this.fileName.set(file.name);
  }

  resetImage(event: Event) {
    event.stopPropagation();

    this.formGroup.patchValue({ image: null });
    this.previewUrl.set(null);
    this.fileName.set('Belum ada !');
  }

  fileSize(file: File | null) {
    if (!file) return;
    const label = ['Byte', 'KB', 'MB'];
    let i = 0,
      byte = file.size;
    while (byte > 1024 && i < label.length) {
      byte = byte / 1024;
      i++;
    }

    return `${byte.toFixed(2)} ${label[i]}`;
  }
}
