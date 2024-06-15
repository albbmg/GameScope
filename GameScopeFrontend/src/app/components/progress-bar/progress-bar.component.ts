import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProgressBarComponent implements OnChanges {
  @Input() value: number = 0;
  @Input() color: string = 'grey';

  displayValue: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.displayValue = Number(this.value) || 0;
    }
  }
}
