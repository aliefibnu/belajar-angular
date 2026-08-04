import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
import { AuthService } from '../auth.service';
import { AuthStore } from '../../../store/auth.store';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  authServ = inject(AuthService);
  authStore = inject(AuthStore);
  router = inject(Router);
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['aliefreal@aliefreal.com', [Validators.required, Validators.email]],
      password: ['aliefreal@aliefreal.com', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    const { email, password } = this.loginForm.getRawValue();
    const { data, error } = await this.authServ.login(email, password);
    if (error) return Notify.failure(error.message);
    this.authStore.refetch();

    Notify.success(email + ' Berhasil login !');
    return this.router.navigate(['items']);
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
