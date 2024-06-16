import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  releaseYear: number | null = null;
  genre: string | null = ''; // Initialize with empty string
  developer: string | null = ''; // Initialize with empty string
  platform: string | null = ''; // Initialize with empty string
  videoGames: any[] = [];
  genres: string[] = [];
  developers: string[] = [];
  platforms: string[] = [];

  constructor(private videoGamesService: VideoGamesService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters(): void {
    this.videoGamesService.getFilters().subscribe((filters: any) => {
      this.genres = filters.genres;
      this.developers = filters.developers;
      this.platforms = filters.platforms;
    });
  }

  onSearch(): void {
    this.videoGamesService.searchVideoGames(this.searchQuery, this.releaseYear, this.genre, this.developer, this.platform).subscribe((data: any) => {
      this.videoGames = data;
    });
  }

  onResetFilters(): void {
    this.searchQuery = '';
    this.releaseYear = null;
    this.genre = ''; // Reset to empty string
    this.developer = ''; // Reset to empty string
    this.platform = ''; // Reset to empty string
    this.onSearch();
  }
}
