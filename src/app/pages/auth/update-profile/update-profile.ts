import { Component, inject, signal, computed, OnInit, effect } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideUser,
  lucideCamera,
  lucideTrash2,
  lucideMail,
  lucidePhone,
  lucideMapPin,
  lucideGlobe,
  lucideCalendar,
  lucideCheckCircle2,
  lucideArrowLeft,
  lucideSave,
  lucideUploadCloud,
} from '@ng-icons/lucide';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { AuthStore } from '../../../store/auth.store';
import { FormUtil } from '../../../utils/form.util';
import { Supabase } from '../../../utils/supabase';
import { AuthService } from '../auth.service';
import { Loader } from '../../../components/loader/loader';

@Component({
  selector: 'app-update-profile',
  imports: [ReactiveFormsModule, RouterLink, NgIcon, Loader],
  templateUrl: './update-profile.html',
  providers: [
    provideIcons({
      lucideUser,
      lucideCamera,
      lucideTrash2,
      lucideMail,
      lucidePhone,
      lucideMapPin,
      lucideGlobe,
      lucideCalendar,
      lucideCheckCircle2,
      lucideArrowLeft,
      lucideSave,
      lucideUploadCloud,
    }),
  ],
})
export class UpdateProfilePage {
  authStore = inject(AuthStore);
  authService = inject(AuthService);
  formUtil = inject(FormUtil);
  currentUser = computed(() => this.authStore.user())();
  supabaseUtil = inject(Supabase);
  supabase = this.supabaseUtil.supabase;
  router = inject(Router);

  avatarPreview = signal<string | null>(
    !!this.currentUser?.user_metadata?.['avatar_url']
      ? this.currentUser?.user_metadata?.['avatar_url'] + '?timestamp=' + Date.now().toString()
      : null,
  );
  isSaving = signal<boolean>(false);

  readonly maxBioLength = 200;

  profileForm!: FormGroup;

  constructor() {
    effect(() => {
      this.profileForm = new FormGroup({
        fullName: new FormControl(this.currentUser?.user_metadata?.['full_name'], [
          Validators.required,
        ]),
        displayName: new FormControl(this.currentUser?.user_metadata?.['display_name'], [
          Validators.required,
        ]),
        email: new FormControl({ value: this.currentUser?.email, disabled: true }),
        phone: new FormControl(this.currentUser?.phone),
        bio: new FormControl(this.currentUser?.user_metadata?.['bio'], [
          Validators.maxLength(this.maxBioLength),
        ]),
        birthDate: new FormControl(this.currentUser?.user_metadata?.['birth_date']),
        gender: new FormControl(this.currentUser?.user_metadata?.['gender']),
        location: new FormControl(this.currentUser?.user_metadata?.['location']),
        website: new FormControl(this.currentUser?.user_metadata?.['website']),
        avatar: new FormControl<File | null>(null),
      });
    });
  }

  onAvatarSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      if (file.size > 2 * 1024 * 1024) {
        Notify.failure('Ukuran foto maksimal 2MB.');
        return;
      }

      this.avatarPreview.set(URL.createObjectURL(file));
      this.profileForm.patchValue({ avatar: file });
    }
  }

  removeAvatar(): void {
    this.avatarPreview.set(null);
    this.profileForm.patchValue({ avatar: null });
    Notify.info('Foto profil dihapus.');
  }

  async onSaveProfile(): Promise<void> {
    try {
      this.isSaving.set(false);
      await this.formUtil.getFormValidationErrors(this.profileForm);

      const { fullName, displayName, phone, bio, birthDate, gender, location, website, avatar } =
        this.profileForm.getRawValue();
      let data: {
        phone: any;
        full_name: any;
        display_name: any;
        bio: any;
        birth_date: any;
        gender: any;
        location: any;
        website: any;
        avatar_url?: string;
      } = {
        phone,
        full_name: fullName,
        display_name: displayName,
        bio,
        birth_date: birthDate,
        gender,
        location,
        website,
      };

      if (avatar) {
        const { error } = await this.supabase.storage
          .from('avatars')
          .upload(`${this.currentUser?.id}.${(avatar as File).name.split('.').at(-1)}`, avatar, {
            contentType: (avatar as File).type,
            upsert: true,
          });
        if (error) return Notify.failure(error.message);
        const { data: publicData } = this.supabase.storage
          .from('avatars')
          .getPublicUrl(`${this.currentUser?.id}.${(avatar as File).name.split('.').at(-1)}`);

        data = { ...data, avatar_url: publicData.publicUrl };
      }

      if (!avatar && !this.avatarPreview()) {
        data = { ...data, avatar_url: '' };
      }

      await this.authService.update({
        data,
      });
      this.authStore.refetch();
      this.router.navigate(['auth/profile']);
      Notify.success('Berhasil Update Profile');
    } catch (errs) {
      return this.profileForm.markAllAsTouched();
    } finally {
      this.isSaving.set(false);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.profileForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Wajib diisi';
      if (control.errors['email']) return 'Format email tidak valid';
      if (control.errors['minlength'])
        return `Minimal ${control.errors['minlength'].requiredLength} karakter`;
      if (control.errors['maxlength'])
        return `Maksimal ${control.errors['maxlength'].requiredLength} karakter`;
    }
    return '';
  }
}
