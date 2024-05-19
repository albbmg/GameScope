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
  videoGames: any[] = [];

  constructor(private videoGamesService: VideoGamesService) {}

  ngOnInit(): void {}

  onSearch(): void {
    this.videoGamesService.searchVideoGames(this.searchQuery, this.releaseYear).subscribe((data: any) => {
      this.videoGames = data;
    });
  }

  onResetFilters(): void {
    this.searchQuery = '';
    this.releaseYear = null;
    this.onSearch();
  }
}
