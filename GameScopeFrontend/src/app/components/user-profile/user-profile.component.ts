import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule]
})
export class UserProfileComponent implements OnInit {
  user: any;
  favoriteGames: any[] = []; // Lista de juegos favoritos
  pendingGames: any[] = []; // Lista de juegos pendientes

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });

    // Obtener listas de juegos favoritos y pendientes
    this.getFavoriteGames();
    this.getPendingGames();
  }

  getFavoriteGames() {
    // Lógica para obtener juegos favoritos
    this.favoriteGames = [
      { title: 'Juego 1', description: 'Descripción', rating: 5, image: 'path/to/image.jpg' },
      // Más juegos
    ];
  }

  getPendingGames() {
    // Lógica para obtener juegos pendientes
    this.pendingGames = [
      { title: 'Juego 2', description: 'Descripción', rating: 4, image: 'path/to/image.jpg' },
      // Más juegos
    ];
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
