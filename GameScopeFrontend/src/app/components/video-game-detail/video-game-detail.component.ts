import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-video-game-detail',
  templateUrl: './video-game-detail.component.html',
  styleUrls: ['./video-game-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class VideoGameDetailComponent implements OnInit {
  gameId: string | null = null;
  game: any = null;

  constructor(
    private route: ActivatedRoute,
    private videoGamesService: VideoGamesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id');
      if (this.gameId) {
        this.videoGamesService.getVideoGameById(this.gameId).subscribe(data => {
          this.game = data;
        });
      }
    });
  }
}
