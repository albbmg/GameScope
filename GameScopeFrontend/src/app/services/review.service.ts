import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews`, { headers: this.getHeaders() });
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reviews/${id}`, { headers: this.getHeaders() });
  }

  searchReviews(searchQuery: string, userId?: string): Observable<any> {
    let params = new HttpParams().set('searchQuery', searchQuery);
    if (userId) {
      params = params.set('userId', userId);
    }
    return this.http.get(`${this.apiUrl}/reviews/search`, { headers: this.getHeaders(), params });
  }
}
