import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowLeftFromLine,
  lucideFileImage,
  lucideImage,
  lucideSend,
  lucideX,
} from '@ng-icons/lucide';
import { ItemsService } from '../items.service';
import { FormUtil } from '../../../utils/form.util';

@Component({
  selector: 'app-create',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create.html',
  providers: provideIcons({
    lucideArrowLeftFromLine,
    lucideSend,
    lucideImage,
    lucideFileImage,
    lucideX,
  }),
})
export class CreateItemPage {
  itemServ = inject(ItemsService);
  formUtil = inject(FormUtil);
  router = inject(Router);
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    description: new FormControl('', [Validators.minLength(6), Validators.required]),
    image: new FormControl<File | null>(null),
  });
  previewUrl = signal<string | null>(null);
  selectedFile = signal<File | null>(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        Notify.failure('Please upload an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        Notify.failure('File size should not exceed 5MB');
        return;
      }

      this.selectedFile.set(file);
      this.formGroup.patchValue({ image: file });

      this.previewUrl.set(URL.createObjectURL(file));
    }
  }

  removeImage(event: Event): void {
    event.stopPropagation();
    this.previewUrl.set(null);
    this.selectedFile.set(null);
    this.formGroup.patchValue({ image: null });

    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onSubmit(): void {
    this.formUtil
      .getFormValidationErrors(this.formGroup)
      .then(() => {
        const formData = new FormData();
        formData.append('name', this.formGroup.get('name')?.value ?? '');
        formData.append('description', this.formGroup.get('description')?.value ?? '');

        if (this.selectedFile()) {
          formData.append('image', this.selectedFile()!);
        }

        this.itemServ.create(formData).subscribe({
          next: (res) => {
            Notify.success('Berhasil membuat item!');
            this.router.navigate(['items']);
          },
          error: (err) => {
            Notify.failure('Gagal membuat item!');
          },
        });
      })
      .catch((err) =>
        err.forEach((error: string) => {
          Notify.failure(error);
        }),
      );
  }
}
