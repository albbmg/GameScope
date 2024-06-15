import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoGamesService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getVideoGames(page: number = 1, pageSize: number = 8): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<any>(`${this.apiUrl}/video-games`, { headers: this.getHeaders(), params }).pipe(
      switchMap((response: any) => this.calculateRatingsForGames(response.data))
    );
  }

  getVideoGameById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/video-games/${id}`, { headers: this.getHeaders() }).pipe(
      switchMap((game: any) => this.calculateRatingForGame(game))
    );
  }

  calculateRatingsForGames(games: any[]): Observable<any[]> {
    const gamesWithRatings$ = games.map(game => this.calculateRatingForGame(game));
    return forkJoin(gamesWithRatings$);
  }

  calculateRatingForGame(game: any): Observable<any> {
    return this.getReviewsByGameId(game.id).pipe(
      map(reviews => {
        const totalRating = reviews.reduce((acc: number, review: any) => acc + review.rating, 0);
        game.rating = reviews.length ? totalRating / reviews.length : 0;
        return game;
      })
    );
  }

  getReviewsByGameId(gameId: string): Observable<any> {
    const params = new HttpParams().set('game_id', gameId);
    return this.http.get<any[]>(`${this.apiUrl}/reviews`, { headers: this.getHeaders(), params });
  }

  addVideoGame(game: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/video-games`, game, { headers: this.getHeaders() });
  }

  updateVideoGame(id: string, game: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/video-games/${id}`, game, { headers: this.getHeaders() });
  }

  deleteVideoGame(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/video-games/${id}`, { headers: this.getHeaders() });
  }

  addReview(gameId: string, content: string, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, { game_id: gameId, content, rating }, { headers: this.getHeaders() });
  }

  rateGame(gameId: string, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/video-games/rate`, { game_id: gameId, rating }, { headers: this.getHeaders() });
  }

  addToFavorites(gameId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites/add`, { game_id: gameId }, { headers: this.getHeaders() });
  }

  removeFromFavorites(gameId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites/remove`, { game_id: gameId }, { headers: this.getHeaders() });
  }

  checkFavoriteStatus(gameId: string): Observable<any> {
    const params = new HttpParams().set('game_id', gameId);
    return this.http.get(`${this.apiUrl}/favorites/status`, { headers: this.getHeaders(), params });
  }

  addToPending(gameId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/pending/add`, { video_game_id: gameId }, { headers: this.getHeaders() });
  }

  removeFromPending(gameId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/pending/remove`, { video_game_id: gameId }, { headers: this.getHeaders() });
  }

  checkPendingStatus(gameId: string): Observable<any> {
    const params = new HttpParams().set('video_game_id', gameId);
    return this.http.get(`${this.apiUrl}/pending/status`, { headers: this.getHeaders(), params });
  }

  searchVideoGames(searchQuery: string, releaseYear: number | null, genre: string | null, developer: string | null, platform: string | null): Observable<any> {
    let params = new HttpParams().set('searchQuery', searchQuery);
    if (releaseYear !== null) {
      params = params.set('releaseYear', releaseYear.toString());
    }
    if (genre !== null) {
      params = params.set('genre', genre);
    }
    if (developer !== null) {
      params = params.set('developer', developer);
    }
    if (platform !== null) {
      params = params.set('platform', platform);
    }
    return this.http.get(`${this.apiUrl}/search`, { headers: this.getHeaders(), params });
  }

  getFilters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/filters`, { headers: this.getHeaders() });
  }

  getMultipleVideoGames(ids: string[]): Observable<any> {
    const params = new HttpParams().set('ids', ids.join(','));
    return this.http.get(`${this.apiUrl}/video-games/multiple`, { headers: this.getHeaders(), params });
  }

  getFavorites(): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites`, { headers: this.getHeaders() });
  }

  getPendingGames(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending`, { headers: this.getHeaders() });
  }

  getReviewsByUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-reviews`, { headers: this.getHeaders() });
  }

  getAllReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews`, { headers: this.getHeaders() });
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reviews/${reviewId}`, { headers: this.getHeaders() });
  }
}
