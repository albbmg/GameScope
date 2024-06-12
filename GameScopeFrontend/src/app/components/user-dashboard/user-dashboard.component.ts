import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

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
  errorMessage: string = '';  // Añadimos la propiedad errorMessage
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
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      newPassword: ['', [Validators.minLength(8)]],
      newPassword_confirmation: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUserData();
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
          this.errorMessage = '';  // Limpiar el mensaje de error
          setTimeout(() => this.successMessage = '', 3000); // Limpiar el mensaje después de 3 segundos
        },
        error: error => {
          console.error('Error al actualizar el perfil', error);
          this.errorMessage = 'Error al actualizar el perfil. Por favor, inténtalo de nuevo.';
          setTimeout(() => this.errorMessage = '', 3000); // Limpiar el mensaje después de 3 segundos
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
        this.errorMessage = '';  // Limpiar el mensaje de error
        setTimeout(() => this.successMessage = '', 3000); // Limpiar el mensaje después de 3 segundos
      },
      error: error => {
        console.error('Error al subir la imagen del perfil', error);
        this.errorMessage = 'Error al subir la imagen del perfil. Por favor, inténtalo de nuevo.';
        setTimeout(() => this.errorMessage = '', 3000); // Limpiar el mensaje después de 3 segundos
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
