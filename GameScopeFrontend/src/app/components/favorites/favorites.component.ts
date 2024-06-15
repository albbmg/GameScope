import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';
import { AuthService } from '../../services/auth.service';
import { VideoGamesComponent } from '../video-games/video-games.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, VideoGamesComponent]
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private videoGamesService: VideoGamesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.checkAdmin();
  }

  loadFavorites(): void {
    this.videoGamesService.getFavorites().subscribe({
      next: data => {
        this.favorites = data.map((game: any) => {
          game.rating = this.calculateAverageRating(game.reviews);
          return game;
        });
      },
      error: error => console.error('Error al cargar los juegos favoritos', error)
    });
  }

  calculateAverageRating(reviews: any[]): number {
    if (reviews && reviews.length > 0) {
      const sum = reviews.reduce((acc: number, review: any) => acc + review.rating, 0);
      return sum / reviews.length;
    }
    return 0;
  }

  checkAdmin(): void {
    this.isAdmin = this.authService.getRole() === 'admin';
  }

  goToProfile(): void {
    this.router.navigate(['/user-dashboard']);
  }
}
