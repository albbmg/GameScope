import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-game-detail',
  templateUrl: './video-game-detail.component.html',
  styleUrls: ['./video-game-detail.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule]
})
export class VideoGameDetailComponent implements OnInit {
  gameId: string | null = null;
  game: any = null;
  reviews: any[] = [];
  newReview: string = '';
  newRating: number = 5;
  successMessage: string = '';
  errorMessage: string = '';
  isFavorite: boolean = false;
  isPending: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private videoGamesService: VideoGamesService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id');
      if (this.gameId) {
        this.videoGamesService.getVideoGameById(this.gameId).subscribe(data => {
          this.game = data;
          this.checkFavoriteStatus();
          this.checkPendingStatus();
          this.loadReviews();
        });
      }
    });
  }

  checkFavoriteStatus(): void {
    if (this.gameId) {
      this.videoGamesService.checkFavoriteStatus(this.gameId).subscribe((response: any) => {
        this.isFavorite = response.isFavorite;
      });
    }
  }

  checkPendingStatus(): void {
    if (this.gameId) {
      this.videoGamesService.checkPendingStatus(this.gameId).subscribe((response: any) => {
        this.isPending = response.isPending;
      });
    }
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  }

  togglePending(): void {
    if (this.isPending) {
      this.removeFromPending();
    } else {
      this.addToPending();
    }
  }

  addToFavorites(): void {
    if (this.gameId) {
      this.videoGamesService.addToFavorites(this.gameId).subscribe({
        next: () => {
          this.isFavorite = true;
          this.successMessage = 'Juego añadido a favoritos';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: error => {
          this.errorMessage = 'Error al añadir a favoritos';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  removeFromFavorites(): void {
    if (this.gameId) {
      this.videoGamesService.removeFromFavorites(this.gameId).subscribe({
        next: () => {
          this.isFavorite = false;
          this.successMessage = 'Juego retirado de favoritos';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: error => {
          this.errorMessage = 'Error al retirar de favoritos';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  addToPending(): void {
    if (this.gameId) {
      this.videoGamesService.addToPending(this.gameId).subscribe({
        next: () => {
          this.isPending = true;
          this.successMessage = 'Juego añadido a pendientes';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: error => {
          this.errorMessage = 'Error al añadir a pendientes';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  removeFromPending(): void {
    if (this.gameId) {
      this.videoGamesService.removeFromPending(this.gameId).subscribe({
        next: () => {
          this.isPending = false;
          this.successMessage = 'Juego retirado de pendientes';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: error => {
          this.errorMessage = 'Error al retirar de pendientes';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  loadReviews(): void {
    if (this.gameId) {
      this.videoGamesService.getReviewsByGameId(this.gameId).subscribe({
        next: (data: any) => {
          this.reviews = data;
          this.calculateAverageRating();
        },
        error: error => {
          this.errorMessage = 'Error al cargar las reseñas';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  calculateAverageRating(): void {
    if (this.reviews.length > 0) {
      const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
      this.game.rating = sum / this.reviews.length;
    } else {
      this.game.rating = 0;
    }
  }

  addReview(): void {
    if (this.gameId && this.newReview) {
      this.videoGamesService.addReview(this.gameId, this.newReview, this.newRating).subscribe({
        next: () => {
          this.successMessage = 'Reseña añadida con éxito';
          setTimeout(() => this.successMessage = '', 3000);
          this.newReview = '';
          this.newRating = 5;
          this.loadReviews();
        },
        error: error => {
          this.errorMessage = 'Error al añadir la reseña';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  rateGame(rating: number): void {
    if (this.gameId) {
      this.videoGamesService.rateGame(this.gameId, rating).subscribe({
        next: () => {
          this.successMessage = 'Calificación registrada con éxito';
          setTimeout(() => this.successMessage = '', 3000);
          this.loadReviews();
        },
        error: error => {
          this.errorMessage = 'Error al registrar la calificación';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }
}
