import { Component, OnInit } from '@angular/core';
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
  videoGames: any[] = [];

  constructor(private videoGamesService: VideoGamesService) { }

  ngOnInit(): void {
    this.videoGamesService.getVideoGames().subscribe(data => {
      this.videoGames = data;
    });
  }
}
