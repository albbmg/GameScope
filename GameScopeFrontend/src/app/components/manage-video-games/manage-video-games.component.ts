import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoGamesService } from '../../services/video-games.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-video-games',
  templateUrl: './manage-video-games.component.html',
  styleUrls: ['./manage-video-games.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class ManageVideoGamesComponent implements OnInit {
  videoGames: any[] = [];
  searchQuery: string = '';
  addOrUpdateGameForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  user: any;
  isAdmin: boolean = false;
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(
    private videoGamesService: VideoGamesService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.addOrUpdateGameForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      developer: ['', Validators.required],
      genre: ['', Validators.required],
      platform: ['', Validators.required],
      release_year: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadVideoGames();
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.isAdmin = user.role === 'admin';
    });
  }

  loadVideoGames(): void {
    this.videoGamesService.getVideoGames().subscribe({
      next: data => this.videoGames = data,
      error: error => console.error('Error al cargar los videojuegos', error)
    });
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.videoGamesService.searchVideoGames(this.searchQuery, null).subscribe({
        next: data => this.videoGames = data,
        error: error => console.error('Error al buscar videojuegos', error)
      });
    } else {
      this.loadVideoGames();
    }
  }

  onResetFilters(): void {
    this.searchQuery = '';
    this.loadVideoGames();
  }

  addOrUpdateGame(): void {
    if (this.addOrUpdateGameForm.valid) {
      const gameData = this.addOrUpdateGameForm.value;
      if (gameData.id) {
        // Update game
        this.videoGamesService.updateVideoGame(gameData.id, gameData).subscribe({
          next: () => {
            this.successMessage = 'Videojuego actualizado con éxito';
            this.addOrUpdateGameForm.reset();
            this.loadVideoGames();
            setTimeout(() => this.successMessage = '', 3000);
          },
          error: error => {
            console.error('Error al actualizar el videojuego', error);
            this.errorMessage = 'Error al actualizar el videojuego';
            setTimeout(() => this.errorMessage = '', 3000);
          }
        });
      } else {
        // Add game
        this.videoGamesService.addVideoGame(gameData).subscribe({
          next: () => {
            this.successMessage = 'Videojuego añadido con éxito';
            this.addOrUpdateGameForm.reset();
            this.loadVideoGames();
            setTimeout(() => this.successMessage = '', 3000);
          },
          error: error => {
            console.error('Error al añadir el videojuego', error);
            this.errorMessage = 'Error al añadir el videojuego';
            setTimeout(() => this.errorMessage = '', 3000);
          }
        });
      }
    }
  }

  editGame(game: any): void {
    this.addOrUpdateGameForm.patchValue(game);
  }

  deleteGame(id: string): void {
    this.videoGamesService.deleteVideoGame(id).subscribe({
      next: () => {
        this.successMessage = 'Videojuego eliminado con éxito';
        this.loadVideoGames();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: error => {
        console.error('Error al eliminar el videojuego', error);
        this.errorMessage = 'Error al eliminar el videojuego';
        setTimeout(() => this.errorMessage = '', 3000);
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

  get paginatedVideoGames(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.videoGames.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.videoGames.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
