import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideLock,
  lucideEye,
  lucideEyeOff,
  lucideLogIn,
  lucideAlertCircle,
  lucideLoader2,
} from '@ng-icons/lucide';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgIcon],
  templateUrl: './login.html',
  providers: [
    provideIcons({
      lucideMail,
      lucideLock,
      lucideEye,
      lucideEyeOff,
      lucideLogIn,
      lucideAlertCircle,
      lucideLoader2,
    }),
  ],
})
export class LoginPage {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      // Simulasi loading
      setTimeout(() => {
        this.isLoading = false;

        Notify.success('Login berhasil! Selamat datang kembali.', {
          position: 'right-top',
          timeout: 3000,
          cssAnimationStyle: 'from-right',
        });

        console.log('Form Data:', this.loginForm.value);
      }, 2000);
    } else {
      this.markFormGroupTouched(this.loginForm);

      Notify.failure('Mohon lengkapi form dengan benar', {
        position: 'right-top',
        timeout: 3000,
        cssAnimationStyle: 'from-right',
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Field ini wajib diisi';
      }
      if (control.errors['email']) {
        return 'Format email tidak valid';
      }
      if (control.errors['minlength']) {
        return `Minimal ${control.errors['minlength'].requiredLength} karakter`;
      }
    }
    return '';
  }
}
