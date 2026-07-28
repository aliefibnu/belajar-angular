import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeftFromLine, lucideSend } from '@ng-icons/lucide';

@Component({
  selector: 'app-create',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, NgIcon],
  templateUrl: './create.html',
  providers: provideIcons({ lucideArrowLeftFromLine, lucideSend }),
})
export class CreateItemPage {
  http = inject(HttpClient);
  router = inject(Router);
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    description: new FormControl('', [Validators.minLength(6), Validators.required]),
  });

  onSubmit() {
    const errors = this.getFormValidationErrors(this.formGroup);
    if (errors.length > 0) {
      errors.forEach((err) => Notify.failure(err));
      return;
    }

    const { name, description } = this.formGroup.getRawValue();

    this.http.post('/items', { name, description }).subscribe({
      next: () => {
        Notify.success('Berhasi membuat item baru !');
        this.router.navigate(['items']);
      },
      error: ({ error }) => Notify.failure(error.errors),
    });
  }

  getFormValidationErrors(form: FormGroup | FormArray) {
    const errors: string[] = [];
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.getFormValidationErrors(control);
      } else if (control instanceof FormControl && control.errors) {
        Object.keys(control.errors).forEach((errorKey) => {
          errors.push(`${key} error ${errorKey}`);
        });
      }
    });
    return errors;
  }
}
