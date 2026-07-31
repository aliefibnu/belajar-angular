import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideUser,
  lucideMail,
  lucideLock,
  lucideEye,
  lucideEyeOff,
  lucideUserPlus,
  lucideAlertCircle,
  lucideLoader2,
  lucidePhone,
  lucideCheckCircle,
} from '@ng-icons/lucide';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, NgIcon],
  templateUrl: './signup.html',
  providers: [
    provideIcons({
      lucideUser,
      lucideMail,
      lucideLock,
      lucideEye,
      lucideEyeOff,
      lucideUserPlus,
      lucideAlertCircle,
      lucideLoader2,
      lucidePhone,
      lucideCheckCircle,
    }),
  ],
})
export class SignupPage {
  authServ = inject(AuthService);
  signupForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  currentStep = 1;
  totalSteps = 2;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,13}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      const step1Controls = ['fullName', 'email', 'phone'];
      let isValid = true;

      step1Controls.forEach((controlName) => {
        const control = this.signupForm.get(controlName);
        control?.markAsTouched();
        if (control?.invalid) {
          isValid = false;
        }
      });

      if (isValid) {
        this.currentStep = 2;
        Notify.info('Silakan lengkapi password Anda', {
          position: 'right-top',
          timeout: 2000,
          cssAnimationStyle: 'from-right',
        });
      } else {
        Notify.warning('Mohon lengkapi data diri dengan benar', {
          position: 'right-top',
          timeout: 3000,
          cssAnimationStyle: 'from-right',
        });
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    try {
      const { email, password } = this.signupForm.getRawValue();
      this.authServ.signup('', email, password).then((res) => {
        console.log(res);
      });
    } catch (error) {}
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
    const control = this.signupForm.get(controlName);
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
      if (control.errors['pattern']) {
        return 'Format nomor telepon tidak valid';
      }
      if (control.errors['passwordMismatch']) {
        return 'Password tidak cocok';
      }
      if (control.errors['requiredTrue']) {
        return 'Anda harus menyetujui syarat & ketentuan';
      }
    }
    return '';
  }

  getStepValidity(step: number): boolean {
    if (step === 1) {
      return (
        this.signupForm.get('fullName')!.valid &&
        this.signupForm.get('email')!.valid &&
        this.signupForm.get('phone')!.valid
      );
    }
    return true;
  }
}
