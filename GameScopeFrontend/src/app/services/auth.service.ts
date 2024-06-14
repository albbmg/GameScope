import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/login']);
      }),
      catchError(this.handleError)
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access_token);
        this.getUser().subscribe(user => {
          localStorage.setItem('user_role', user.role);
          this.authStatusSubject.next(true);
          if (user.role === 'admin') {
            this.router.navigate(['/user-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
        });
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('X-CSRF-TOKEN', this.getCsrfToken() || '');

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_role');
        this.authStatusSubject.next(false);
        this.router.navigate(['/login']);
      }),
      catchError(this.handleError)
    );
  }

  getUser(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get(`${this.apiUrl}/user`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get(`${this.apiUrl}/users`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getCsrfToken(): string | null {
    return 'your-csrf-token';
  }

  getRole(): string | null {
    return localStorage.getItem('user_role');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
