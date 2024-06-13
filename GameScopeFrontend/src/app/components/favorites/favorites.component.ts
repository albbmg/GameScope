import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private videoGamesService: VideoGamesService, private router: Router) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.videoGamesService.getFavorites().subscribe({
      next: data => {
        this.favorites = data;
      },
      error: error => console.error('Error al cargar los juegos favoritos', error)
    });
  }

  goToProfile(): void {
    this.router.navigate(['/user-dashboard']);
  }
}
