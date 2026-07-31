import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { AuthStore } from '../../../store/auth.store';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.html',
  styles: ``,
})
export class ProfilePage implements OnInit {
  authStore = inject(AuthStore);

  ngOnInit() {
    this.authStore.load();
  }
}
