import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/user/profile`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/user/profile`, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/user/profile-image`, formData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/users`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateUserRole(userId: string, role: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/users/${userId}/role`, { role }, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
