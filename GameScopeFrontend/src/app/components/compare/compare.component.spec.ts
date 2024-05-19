import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CompareComponent implements OnInit {
  game1: any = null;
  game2: any = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { games: any[] };
    if (state && state.games && state.games.length === 2) {
      this.game1 = state.games[0];
      this.game2 = state.games[1];
    }
  }

  ngOnInit(): void {
  }
}
