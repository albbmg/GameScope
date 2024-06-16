import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ReviewsComponent implements OnInit {
  user: any;
  reviews: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  videoGames: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private videoGamesService: VideoGamesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadUserReviews();
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.isAdmin = user.role === 'admin'; // Check if the user is an admin
    });
  }

  loadUserReviews(): void {
    this.videoGamesService.getReviewsByUser().subscribe({
      next: (data) => {
        this.reviews = data;
        this.loadVideoGames();
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las reseñas';
        console.error('Error al cargar las reseñas', error);
      }
    });
  }

  loadVideoGames(): void {
    this.videoGamesService.getVideoGames().subscribe({
      next: (data) => {
        this.videoGames = data;
        this.matchReviewsWithGames();
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los videojuegos';
        console.error('Error al cargar los videojuegos', error);
      }
    });
  }

  matchReviewsWithGames(): void {
    this.reviews.forEach(review => {
      const game = this.videoGames.find(game => game.id === review.game_id);
      if (game) {
        review.game = game;
      }
    });
  }

  deleteReview(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
      this.videoGamesService.deleteReview(id).subscribe({
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

  goToProfile(): void {
    this.router.navigate(['/user-dashboard']);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
