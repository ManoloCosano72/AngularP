import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.getUser(); // Obtiene el estado del usuario como un observable
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  logout(): void {
    this.authService.logout();
  }
}
