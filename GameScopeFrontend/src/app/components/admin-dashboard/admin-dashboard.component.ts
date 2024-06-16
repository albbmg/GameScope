import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoGamesService } from '../../services/video-games.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class AdminDashboardComponent implements OnInit {
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

  constructor(
    private userService: UserService,
    private videoGamesService: VideoGamesService,
    private fb: FormBuilder,
    private router: Router
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
        this.favorites = data;
      },
      error: error => console.error('Error al cargar los juegos favoritos', error)
    });
  }

  loadPendingGames(): void {
    this.videoGamesService.getPendingGames().subscribe({
      next: data => {
        this.pendingGames = data;
      },
      error: error => console.error('Error al cargar los juegos pendientes', error)
    });
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
          console.log('Perfil actualizado', response);
          this.successMessage = '¡Información del perfil actualizada con éxito!';
          this.errorMessage = '';
          this.updateSuccessMessage = '¡Perfil actualizado con éxito!'; 
          setTimeout(() => {
            this.successMessage = '';
            this.updateSuccessMessage = ''; 
          }, 3000);
        },
        error: error => {
          console.error('Error al actualizar el perfil', error);
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
        console.error('Error al subir la imagen del perfil', error);
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
    this.router.navigate(['/admin-dashboard']);
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
