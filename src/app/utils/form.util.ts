import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtil {
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
    return new Promise((resolve, reject) => {
      if (errors.length) reject(errors);
      resolve(null);
    });
  }
}
