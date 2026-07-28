import { HttpClient } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
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
import { ResponseItem } from '../items.service';
import { Loader } from '../../../components/loader/loader';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeftFromLine, lucideSend } from '@ng-icons/lucide';

@Component({
  selector: 'app-edit',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, Loader, NgIcon],
  providers: provideIcons({ lucideArrowLeftFromLine, lucideSend }),
  templateUrl: './edit.html',
})
export class EditItemPage {
  http = inject(HttpClient);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  thisItem = toSignal(
    this.http
      .get<{ success: boolean; data: ResponseItem['data'][0] }>(
        '/items/' + this.activatedRoute.snapshot.params['id'],
      )
      .pipe(
        filter((res) => !!res.data),
        map((res) => res.data),
      ),
  );

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    description: new FormControl('', [Validators.minLength(6), Validators.required]),
  });

  constructor() {
    effect(() => {
      const item = this.thisItem();
      if (!item) return;

      this.formGroup.patchValue({
        name: item.name,
        description: item.description,
      });
    });
  }

  onSubmit() {
    const errors = this.getFormValidationErrors(this.formGroup);
    if (errors.length > 0) {
      errors.forEach((err) => Notify.failure(err));
      return;
    }

    const { name, description } = this.formGroup.getRawValue();
    const id = this.activatedRoute.snapshot.params['id'];

    this.http.patch(`/items/${id}`, { name, description }).subscribe({
      next: () => {
        Notify.success('Berhasil mengubah item!');
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
