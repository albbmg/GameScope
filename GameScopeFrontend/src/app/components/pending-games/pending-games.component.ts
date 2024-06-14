import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';
import { AuthService } from '../../services/auth.service'; // Importar AuthService

@Component({
  selector: 'app-pending-games',
  templateUrl: './pending-games.component.html',
  styleUrls: ['./pending-games.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PendingGamesComponent implements OnInit {
  pendingGames: any[] = [];
  isAdmin: boolean = false; // Añadir esta línea

  constructor(
    private videoGamesService: VideoGamesService,
    private router: Router,
    private authService: AuthService // Añadir AuthService aquí
  ) {}

  ngOnInit(): void {
    this.loadPendingGames();
    this.checkAdmin(); // Añadir esta línea
  }

  loadPendingGames(): void {
    this.videoGamesService.getPendingGames().subscribe({
      next: data => {
        this.pendingGames = data;
      },
      error: error => console.error('Error al cargar los juegos pendientes', error)
    });
  }

  checkAdmin(): void {
    this.isAdmin = this.authService.getRole() === 'admin'; // Añadir esta línea
  }

  goToProfile(): void {
    this.router.navigate(['/user-dashboard']);
  }
}
