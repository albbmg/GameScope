import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class UserDashboardComponent implements OnInit {
  user: any;
  profileForm: FormGroup;
  successMessage: string = '';
  profileControls: { name: string, placeholder: string }[] = [
    { name: 'firstName', placeholder: 'Nombre' },
    { name: 'lastName', placeholder: 'Apellidos' },
    { name: 'email', placeholder: 'Correo electrónico' },
    { name: 'phone', placeholder: 'Teléfono' },
    { name: 'password', placeholder: 'Contraseña' },
    { name: 'newPassword', placeholder: 'Nueva contraseña' }
  ];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      password: [''],
      newPassword: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUser().subscribe({
      next: data => {
        this.user = data;
        this.profileForm.patchValue({
          firstName: this.user.first_name,
          lastName: this.user.last_name,
          email: this.user.email,
          phone: this.user.phone
        });
      },
      error: error => console.error('Error al cargar los datos del usuario', error)
    });
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.userService.updateUser(this.profileForm.value).subscribe({
        next: response => {
          console.log('Perfil actualizado', response);
          this.successMessage = '¡Información del perfil actualizada con éxito!';
          setTimeout(() => this.successMessage = '', 3000); // Limpiar el mensaje después de 3 segundos
        },
        error: error => {
          console.error('Error al actualizar el perfil', error);
          this.successMessage = 'Error al actualizar el perfil. Por favor, inténtalo de nuevo.';
          setTimeout(() => this.successMessage = '', 3000); // Limpiar el mensaje después de 3 segundos
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
        setTimeout(() => this.successMessage = '', 3000); // Limpiar el mensaje después de 3 segundos
      },
      error: error => {
        console.error('Error al subir la imagen del perfil', error);
        this.successMessage = 'Error al subir la imagen del perfil. Por favor, inténtalo de nuevo.';
        setTimeout(() => this.successMessage = '', 3000); // Limpiar el mensaje después de 3 segundos
      }
    });
  }

  goToProfile(): void {
    this.router.navigate(['/user-dashboard']);
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        localStorage.removeItem('access_token'); // Elimina el token del almacenamiento local
        this.router.navigate(['/login']); // Redirige al usuario a la página de login
      },
      error: error => console.error('Error al cerrar sesión', error)
    });
  }
}
