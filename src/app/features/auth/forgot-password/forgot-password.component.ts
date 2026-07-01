import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss'],
})
export class ForgotPasswordComponent {
  email = '';
  loading = signal(false);
  sent = signal(false);

  onSubmit() {
    this.loading.set(true);
    setTimeout(() => { this.loading.set(false); this.sent.set(true); }, 1200);
  }
}
