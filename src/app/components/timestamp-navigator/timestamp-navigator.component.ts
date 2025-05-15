import { Component, input, output, signal } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timestamp-navigator',
  standalone: true,
  imports: [CommonModule, MatSliderModule, FormsModule],
  templateUrl: './timestamp-navigator.component.html',
  styleUrl: './timestamp-navigator.component.scss'
})
export class TimestampNavigatorComponent {
  readonly timestamps = input.required<string[]>();
  onTimestampChange = output<number>();
  selectedIndex!: number;

  onSliderChange() {
    this.onTimestampChange.emit(this.selectedIndex);
  }

}
