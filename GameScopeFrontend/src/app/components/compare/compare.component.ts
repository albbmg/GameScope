import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
  standalone: true,
  imports: [CommonModule, ProgressBarComponent]
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

  ngOnInit(): void {}

  getBarColor(value1: number, value2: number): string {
    if (value2 > value1) {
      return 'green';
    } else if (value2 < value1) {
      return 'red';
    } else {
      return 'grey';
    }
  }

  formatValue(value: any): string {
    const numValue = Number(value);
    return !isNaN(numValue) ? numValue.toFixed(1) : '0.0';
  }

  formatRating(value: any): string {
    const numValue = Number(value);
    return !isNaN(numValue) ? numValue.toFixed(1) : '0.0';
  }
}
