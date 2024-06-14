import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.getRole() === 'admin';

    // Subscribe to the authStatus$ observable to update navbar on login/logout
    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      this.isAdmin = this.authService.getRole() === 'admin';
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isAuthenticated = false;
      this.isAdmin = false;
    });
  }
}
