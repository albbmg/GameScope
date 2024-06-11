import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoGamesService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getVideoGames(): Observable<any> {
    return this.http.get(`${this.apiUrl}/video-games`, { headers: this.getHeaders() });
  }

  getVideoGameById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/video-games/${id}`, { headers: this.getHeaders() });
  }

  getReviewsByGameId(gameId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews`, { headers: this.getHeaders(), params: new HttpParams().set('game_id', gameId) });
  }

  addToFavorites(gameId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites/add`, { game_id: gameId }, { headers: this.getHeaders() });
  }

  removeFromFavorites(gameId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites/remove`, { game_id: gameId }, { headers: this.getHeaders() });
  }

  checkFavoriteStatus(gameId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites/status`, { headers: this.getHeaders(), params: new HttpParams().set('game_id', gameId) });
  }

  addToPending(gameId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/pending/add`, { video_game_id: gameId }, { headers: this.getHeaders() });
  }

  removeFromPending(gameId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/pending/remove`, { video_game_id: gameId }, { headers: this.getHeaders() });
  }

  checkPendingStatus(gameId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending/status`, { headers: this.getHeaders(), params: new HttpParams().set('video_game_id', gameId) });
  }

  searchVideoGames(searchQuery: string, releaseYear: number | null): Observable<any> {
    let params = new HttpParams().set('searchQuery', searchQuery);
    if (releaseYear !== null) {
      params = params.set('releaseYear', releaseYear.toString());
    }
    return this.http.get(`${this.apiUrl}/search`, { headers: this.getHeaders(), params });
  }

  getMultipleVideoGames(ids: string[]): Observable<any> {
    let params = new HttpParams().set('ids', ids.join(','));
    return this.http.get(`${this.apiUrl}/video-games/multiple`, { headers: this.getHeaders(), params });
  }

  addReview(gameId: string, content: string, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, { game_id: gameId, content, rating }, { headers: this.getHeaders() });
  }
}
