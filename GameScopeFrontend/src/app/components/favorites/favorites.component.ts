import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';
import { AuthService } from '../../services/auth.service'; // Importar AuthService

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  isAdmin: boolean = false; // Añadir esta línea

  constructor(
    private videoGamesService: VideoGamesService,
    private router: Router,
    private authService: AuthService // Añadir AuthService aquí
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.checkAdmin(); // Añadir esta línea
  }

  loadFavorites(): void {
    this.videoGamesService.getFavorites().subscribe({
      next: data => {
        this.favorites = data;
      },
      error: error => console.error('Error al cargar los juegos favoritos', error)
    });
  }

  checkAdmin(): void {
    this.isAdmin = this.authService.getRole() === 'admin'; // Añadir esta línea
  }

  goToProfile(): void {
    this.router.navigate(['/user-dashboard']);
  }
}
