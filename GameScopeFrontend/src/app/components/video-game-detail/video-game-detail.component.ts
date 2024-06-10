import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-game-detail',
  templateUrl: './video-game-detail.component.html',
  styleUrls: ['./video-game-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule]
})
export class VideoGameDetailComponent implements OnInit {
  gameId: string | null = null;
  game: any = null;
  reviews: any[] = [];
  newReview: string = '';

  constructor(
    private route: ActivatedRoute,
    private videoGamesService: VideoGamesService,
    public authService: AuthService // Cambiado a public para ser accesible desde el template
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id');
      if (this.gameId) {
        this.videoGamesService.getVideoGameById(this.gameId).subscribe(data => {
          this.game = data;
        });
        this.loadReviews();
      }
    });
  }

  addToFavorites(): void {
    if (this.gameId) {
      this.videoGamesService.addToFavorites(this.gameId).subscribe(() => {
        alert('Juego añadido a favoritos');
      });
    }
  }

  addToPending(): void {
    if (this.gameId) {
      this.videoGamesService.addToPending(this.gameId).subscribe(() => {
        alert('Juego añadido a pendientes');
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
      this.videoGamesService.addReview(this.gameId, this.newReview).subscribe(() => {
        this.newReview = '';
        this.loadReviews();
      });
    }
  }
}
