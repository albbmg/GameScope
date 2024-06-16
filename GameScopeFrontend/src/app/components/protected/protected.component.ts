import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProtectedComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}