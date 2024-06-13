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
  videoGames: any[] = [];

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

  goToProfile(): void {
    this.router.navigate(['/user-dashboard']);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
