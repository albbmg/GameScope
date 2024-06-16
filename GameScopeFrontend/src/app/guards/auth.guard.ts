import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUserRole = this.authService.getRole();
    if (this.authService.isAuthenticated()) {
      if (!route.data['role'] || route.data['role'] === currentUserRole || currentUserRole === 'admin') {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
