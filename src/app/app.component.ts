import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { OrderBookSnapshot } from './models/models';
import { ChartDataService } from './utils/chart-data-service/chart-data.service';
import { OrderBookComponent } from './components/order-book/order-book.component';
import { TimestampNavigatorComponent } from './components/timestamp-navigator/timestamp-navigator.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [OrderBookComponent, TimestampNavigatorComponent, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  orderBookData = signal<OrderBookSnapshot[]>([]);
  chartDataService = inject(ChartDataService);
  timestamps = signal<string[]>([]);
  currentIndex = signal<number>(0);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const sub = this.chartDataService.fetchOrderBookData()
      .subscribe({
        next: (orderBookData => {
          this.orderBookData.set(orderBookData);
          this.timestamps.set(
            orderBookData.map(orderBookItem => orderBookItem.time)
          );
        }),
        error: (err) => {
          console.error(err);
        }
      });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onTimestampChange(timestampIndex: number) {
    console.log('on timestamp change')
    this.currentIndex.set(timestampIndex);
  }

}
