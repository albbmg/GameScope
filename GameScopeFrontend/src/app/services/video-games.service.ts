import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoGamesService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getVideoGames(): Observable<any> {
    return this.http.get(`${this.apiUrl}/video-games`);
  }

  getVideoGameById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/video-games/${id}`);
  }

  getReviewsByGameId(gameId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews`, { params: new HttpParams().set('game_id', gameId) });
  }

  addToFavorites(gameId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites/add`, { game_id: gameId });
  }

  removeFromFavorites(gameId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites/remove`, { game_id: gameId });
  }

  searchVideoGames(searchQuery: string, releaseYear: number | null): Observable<any> {
    let params = new HttpParams().set('searchQuery', searchQuery);
    if (releaseYear !== null) {
      params = params.set('releaseYear', releaseYear.toString());
    }
    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  getMultipleVideoGames(ids: string[]): Observable<any> {
    let params = new HttpParams().set('ids', ids.join(','));
    return this.http.get(`${this.apiUrl}/video-games/multiple`, { params });
  }
}
