import { Injectable, inject, signal } from '@angular/core';
import { OrderBookSnapshot, OrderBookSnapshotItemJson, PriceLevel } from '../../models/models';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private readonly DATA_URL = 'assets/sample.json';
  private http = inject(HttpClient);
  private timestamps$ = signal<string[]>([]);
  timestamps = this.timestamps$.asReadonly();
  private currentTimestamp$ = signal<number>(0);
  currentTimestamp = this.currentTimestamp$.asReadonly();
  // 30 seconds
  private readonly REPLAY_ANIMATION_LENGTH = 30_000;

  fetchOrderBookData(): Observable<OrderBookSnapshot[]> {
    return this.http.get<OrderBookSnapshotItemJson[]>(this.DATA_URL)
      .pipe(
        map((orderBookJson: OrderBookSnapshotItemJson[]) => 
          orderBookJson.map(orderBookItem => this.getTransformedJsonData(orderBookItem))
        ),
        tap(orderBookData => {
          this.timestamps$.set(orderBookData.map(orderBookItem => orderBookItem.time));
        })
      );
  }

  showAllTimestamps(): void {
    const intervalValue = this.REPLAY_ANIMATION_LENGTH / this.timestamps().length;
    const endIndex = this.timestamps().length - 1; 
    let index = 0;

    const interval = setInterval(() => {
      this.setCurrentTimestamp(index);
      index++;
      if (index === endIndex) {
        clearInterval(interval);
      }
    }, intervalValue);
  }

  setCurrentTimestamp(index: number) {
    this.currentTimestamp$.set(index);
  }

  private getTransformedJsonData(snapshot: OrderBookSnapshotItemJson): OrderBookSnapshot {
    const bids: PriceLevel[] = [];
    const asks: PriceLevel[] = [];
  
    for (let i = 1; i <= 10; i++) {
      bids.push({ price: snapshot[`Bid${i}`], size: snapshot[`Bid${i}Size`] });
      asks.push({ price: snapshot[`Ask${i}`], size: snapshot[`Ask${i}Size`] });
    }
  
    return { time: snapshot['Time'], bids, asks };
  }
}
