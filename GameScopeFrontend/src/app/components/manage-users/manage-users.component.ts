import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  searchQuery: string = '';
  addUserForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  user: any;
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.isAdmin = user.role === 'admin';
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('password_confirmation')?.value ? null : { mismatch: true };
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: data => this.users = data,
      error: error => console.error('Error al cargar los usuarios', error)
    });
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.users = this.users.filter(user =>
        user.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadUsers();
    }
  }

  onResetFilters(): void {
    this.searchQuery = '';
    this.loadUsers();
  }

  updateRole(userId: string, role: string): void {
    const newRole = role === 'admin' ? 'user' : 'admin';
    this.userService.updateUserRole(userId, newRole).subscribe({
      next: () => {
        this.successMessage = `Rol de usuario actualizado a ${newRole}`;
        setTimeout(() => this.successMessage = '', 3000);
        this.loadUsers();
      },
      error: error => {
        console.error('Error al actualizar el rol del usuario', error);
        this.errorMessage = 'Error al actualizar el rol del usuario';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  deleteUser(userId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.successMessage = 'Usuario eliminado';
          setTimeout(() => this.successMessage = '', 3000);
          this.loadUsers();
        },
        error: error => {
          console.error('Error al eliminar el usuario', error);
          this.errorMessage = 'Error al eliminar el usuario';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  addUser(): void {
    if (this.addUserForm.valid) {
      this.userService.register(this.addUserForm.value).subscribe({
        next: () => {
          this.successMessage = 'Usuario añadido';
          setTimeout(() => this.successMessage = '', 3000);
          this.addUserForm.reset();
          this.loadUsers();
        },
        error: error => {
          console.error('Error al añadir usuario', error);
          this.errorMessage = 'Error al añadir usuario';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  goToProfile(): void {
    this.router.navigate(['/user-dashboard']);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
