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
  newRating: number = 5; // Valor de ejemplo
  successMessage: string = '';
  errorMessage: string = '';
  isFavorite: boolean = false;
  isPending: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private videoGamesService: VideoGamesService,
    public authService: AuthService, // Cambiado a public para ser accesible desde el template
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
        });
        this.loadReviews();
        this.checkFavoriteStatus();
        this.checkPendingStatus();
      }
    });
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  }

  addToFavorites(): void {
    if (this.gameId) {
      this.videoGamesService.addToFavorites(this.gameId).subscribe({
        next: () => {
          this.successMessage = 'Juego añadido a favoritos';
          this.isFavorite = true;
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
          this.successMessage = 'Juego eliminado de favoritos';
          this.isFavorite = false;
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: error => {
          this.errorMessage = 'Error al eliminar de favoritos';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  togglePending(): void {
    if (this.isPending) {
      this.removeFromPending();
    } else {
      this.addToPending();
    }
  }

  addToPending(): void {
    if (this.gameId) {
      this.videoGamesService.addToPending(this.gameId).subscribe({
        next: () => {
          this.successMessage = 'Juego añadido a pendientes';
          this.isPending = true;
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
          this.successMessage = 'Juego eliminado de pendientes';
          this.isPending = false;
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: error => {
          this.errorMessage = 'Error al eliminar de pendientes';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  loadReviews(): void {
    if (this.gameId) {
      this.videoGamesService.getReviewsByGameId(this.gameId).subscribe((data: any) => {
        this.reviews = data;
      });
    }
  }

  addReview(): void {
    if (this.gameId && this.newReview) {
      this.videoGamesService.addReview(this.gameId, this.newReview, this.newRating).subscribe({
        next: () => {
          this.successMessage = 'Reseña añadida con éxito';
          setTimeout(() => this.successMessage = '', 3000);
          this.newReview = '';
          this.loadReviews();
        },
        error: error => {
          this.errorMessage = 'Error al añadir la reseña';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  checkFavoriteStatus(): void {
    if (this.gameId) {
      this.videoGamesService.checkFavoriteStatus(this.gameId).subscribe({
        next: (data: any) => {
          this.isFavorite = data.isFavorite;
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

  checkPendingStatus(): void {
    if (this.gameId) {
      this.videoGamesService.checkPendingStatus(this.gameId).subscribe({
        next: (data: any) => {
          this.isPending = data.isPending;
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }
}
