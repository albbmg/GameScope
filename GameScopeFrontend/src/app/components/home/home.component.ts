import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoGamesComponent } from '../video-games/video-games.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, VideoGamesComponent]
})
export class HomeComponent {
  title = 'GameScope';
  subtitle = 'Descubre tu próxima aventura';
}
