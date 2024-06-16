import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VideoGamesService } from '../../services/video-games.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-video-games',
  templateUrl: './video-games.component.html',
  styleUrls: ['./video-games.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule]
})
export class VideoGamesComponent implements OnInit {
  @Input() videoGames: any[] = [];
  @Input() fetchGames: boolean = true; 
  currentPage: number = 1;
  pageSize: number = 8;

  constructor(private videoGamesService: VideoGamesService) { }

  ngOnInit(): void {
    if (this.fetchGames && this.videoGames.length === 0) {
      this.loadVideoGames();
    }
  }

  loadVideoGames(): void {
    this.videoGamesService.getVideoGames(this.currentPage, this.pageSize).subscribe(data => {
      this.videoGames = this.videoGames.concat(data);
    });
  }

  loadMoreGames(): void {
    this.currentPage++;
    this.loadVideoGames();
  }
}