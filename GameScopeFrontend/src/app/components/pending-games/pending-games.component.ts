import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';

@Component({
  selector: 'app-pending-games',
  templateUrl: './pending-games.component.html',
  styleUrls: ['./pending-games.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PendingGamesComponent implements OnInit {
  pendingGames: any[] = [];

  constructor(private videoGamesService: VideoGamesService, private router: Router) {}

  ngOnInit(): void {
    this.loadPendingGames();
  }

  loadPendingGames(): void {
    this.videoGamesService.getPendingGames().subscribe({
      next: data => {
        this.pendingGames = data;
      },
      error: error => console.error('Error al cargar los juegos pendientes', error)
    });
  }

  goToProfile(): void {
    this.router.navigate(['/user-dashboard']);
  }
}
