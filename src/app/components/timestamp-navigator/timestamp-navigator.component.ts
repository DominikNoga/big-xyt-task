import { Component, effect, inject } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartDataService } from '../../utils/chart-data-service/chart-data.service';

@Component({
  selector: 'app-timestamp-navigator',
  standalone: true,
  imports: [CommonModule, MatSliderModule, FormsModule],
  templateUrl: './timestamp-navigator.component.html',
  styleUrl: './timestamp-navigator.component.scss'
})
export class TimestampNavigatorComponent {
  chartDataService = inject(ChartDataService);
  readonly timestamps = this.chartDataService.timestamps;
  readonly currentTimestamp = this.chartDataService.currentTimestamp;
  selectedIndex: number = this.currentTimestamp();
  
  constructor() {
    effect(() => {
      this.selectedIndex = this.currentTimestamp();
    })
  }

  getFormattedTime = () => this.chartDataService.formatTimestamp(this.timestamps()[this.selectedIndex]);

  onSliderChange() {
    this.chartDataService.setCurrentTimestamp(this.selectedIndex);
  }

}
