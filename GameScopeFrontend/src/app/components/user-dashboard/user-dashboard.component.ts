import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoGamesService } from '../../services/video-games.service';
import { AuthService } from '../../services/auth.service';
import { VideoGamesComponent } from '../video-games/video-games.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, VideoGamesComponent]
})
export class UserDashboardComponent implements OnInit {
  user: any;
  profileForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  updateSuccessMessage: string = '';
  updateErrorMessage: string = '';
  favorites: any[] = [];
  pendingGames: any[] = [];
  profileControls: { name: string, placeholder: string }[] = [
    { name: 'firstName', placeholder: 'Nombre' },
    { name: 'lastName', placeholder: 'Apellidos' },
    { name: 'email', placeholder: 'Correo electrónico' },
    { name: 'phone', placeholder: 'Teléfono' },
    { name: 'newPassword', placeholder: 'Nueva contraseña' },
    { name: 'newPassword_confirmation', placeholder: 'Confirmar nueva contraseña' }
  ];

  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private videoGamesService: VideoGamesService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      newPassword: [''],
      newPassword_confirmation: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadFavorites();
    this.loadPendingGames();
    this.checkAdmin();
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('newPassword_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  loadUserData(): void {
    this.userService.getUser().subscribe({
      next: data => {
        this.user = data;
        this.profileForm.patchValue({
          firstName: this.user.first_name,
          lastName: this.user.last_name,
          email: this.user.email,
          phone: this.user.phone,
          newPassword: '',
          newPassword_confirmation: ''
        });
      },
      error: error => console.error('Error al cargar los datos del usuario', error)
    });
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

  loadPendingGames(): void {
    this.videoGamesService.getPendingGames().subscribe({
      next: data => {
        this.pendingGames = data.map((game: any) => {
          game.rating = this.calculateAverageRating(game.reviews);
          return game;
        });
      },
      error: error => console.error('Error al cargar los juegos pendientes', error)
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

  updateProfile(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;

      if (!formData.newPassword) {
        delete formData.newPassword;
        delete formData.newPassword_confirmation;
      }

      this.userService.updateUser(formData).subscribe({
        next: response => {
          this.successMessage = '¡Información del perfil actualizada con éxito!';
          this.errorMessage = '';
          this.updateSuccessMessage = '¡Perfil actualizado con éxito!';
          setTimeout(() => {
            this.successMessage = '';
            this.updateSuccessMessage = '';
          }, 3000);
        },
        error: error => {
          this.errorMessage = 'Error al actualizar el perfil. Por favor, inténtalo de nuevo.';
          this.updateErrorMessage = 'Error al actualizar el perfil';
          setTimeout(() => {
            this.errorMessage = '';
            this.updateErrorMessage = '';
          }, 3000);
        }
      });
    }
  }

  uploadProfileImage(event: any): void {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);

    this.userService.uploadProfileImage(formData).subscribe({
      next: response => {
        this.user.profile_image = response.imageUrl;
        this.successMessage = '¡Se ha actualizado la imagen del perfil con éxito!';
        this.errorMessage = '';
        this.updateSuccessMessage = '¡Imagen del perfil actualizada!';
        setTimeout(() => {
          this.successMessage = '';
          this.updateSuccessMessage = '';
        }, 3000);
      },
      error: error => {
        this.errorMessage = 'Error al subir la imagen del perfil. Por favor, inténtalo de nuevo.';
        this.updateErrorMessage = 'Error al subir la imagen del perfil';
        setTimeout(() => {
          this.errorMessage = '';
          this.updateErrorMessage = '';
        }, 3000);
      }
    });
  }

  goToProfile(): void {
    this.router.navigate(['/user-dashboard']);
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      },
      error: error => console.error('Error al cerrar sesión', error)
    });
  }
}