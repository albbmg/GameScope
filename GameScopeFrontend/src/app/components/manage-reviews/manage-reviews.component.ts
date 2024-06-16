import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ManageReviewsComponent implements OnInit {
  reviews: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  user: any;
  isAdmin: boolean = false;

  constructor(
    private reviewService: ReviewService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadReviews();
    this.checkAdmin();
    this.loadUserData();
  }

  loadReviews(): void {
    this.reviewService.getReviews().subscribe({
      next: (data: any) => {
        console.log(data); 
        this.reviews = data;
      },
      error: error => {
        this.errorMessage = 'Error al cargar las reseñas';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  deleteReview(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
      this.reviewService.deleteReview(id).subscribe({
        next: () => {
          this.reviews = this.reviews.filter(review => review.id !== id);
          this.successMessage = 'Reseña eliminada con éxito';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: error => {
          this.errorMessage = 'Error al eliminar la reseña';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  checkAdmin(): void {
    this.isAdmin = this.authService.getRole() === 'admin';
  }

  loadUserData(): void {
    this.authService.getUser().subscribe({
      next: data => {
        this.user = data;
      },
      error: error => console.error('Error al cargar los datos del usuario', error)
    });
  }
}