import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ExploreComponent implements OnInit {
  videoGames: any[] = [];
  displayedVideoGames: any[] = [];
  selectedGames: any[] = [];
  gamesPerPage: number = 12;
  currentPage: number = 0;
  compareMode: boolean = false;

  constructor(private videoGamesService: VideoGamesService, private router: Router) { }

  ngOnInit(): void {
    this.videoGamesService.getVideoGames().subscribe(data => {
      this.videoGames = data;
      this.loadMoreGames();
    });
  }

  loadMoreGames(): void {
    const startIndex = this.currentPage * this.gamesPerPage;
    const endIndex = startIndex + this.gamesPerPage;
    this.displayedVideoGames = this.displayedVideoGames.concat(this.videoGames.slice(startIndex, endIndex));
    this.currentPage++;
  }

  toggleCompareMode(): void {
    this.compareMode = !this.compareMode;
  }

  toggleSelectGame(game: any): void {
    if (!this.compareMode) {
      return;
    }
    const index = this.selectedGames.indexOf(game);
    if (index === -1) {
      this.selectedGames.push(game);
    } else {
      this.selectedGames.splice(index, 1);
    }
    if (this.selectedGames.length === 2) {
      this.router.navigate(['/compare'], { state: { games: this.selectedGames } });
    }
  }

  isGameSelected(game: any): boolean {
    return this.selectedGames.includes(game);
  }
}
