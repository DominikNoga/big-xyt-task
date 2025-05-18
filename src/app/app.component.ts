import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { OrderBookSnapshot } from './models/models';
import { ChartDataService } from './utils/chart-data-service/chart-data.service';
import { OrderBookComponent } from './components/order-book/order-book.component';
import { TimestampNavigatorComponent } from './components/timestamp-navigator/timestamp-navigator.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [OrderBookComponent, TimestampNavigatorComponent, MatCardModule, MatButtonModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  orderBookData = signal<OrderBookSnapshot[]>([]);
  private readonly chartDataService = inject(ChartDataService);
  readonly currentTimestamp = this.chartDataService.currentTimestamp;
  readonly replayInProgress = this.chartDataService.replayInProgress;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const sub = this.chartDataService.fetchOrderBookData()
      .subscribe({
        next: (orderBookData => {
          this.orderBookData.set(orderBookData);
        }),
        error: (err) => {
          console.error(err);
        }
      });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  replay() {
    this.chartDataService.showAllTimestamps();
  }

  cancelReplay() {
    this.chartDataService.cancelReplay();
  }
}
