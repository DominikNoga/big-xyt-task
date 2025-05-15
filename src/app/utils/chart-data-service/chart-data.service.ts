import { Injectable, inject, signal } from '@angular/core';
import { OrderBookSnapshot, OrderBookSnapshotItemJson, PriceLevel } from '../../models/models';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private readonly DATA_URL = 'assets/sample.json';
  private http = inject(HttpClient);

  fetchOrderBookData(): Observable<OrderBookSnapshot[]> {
    return this.http.get<OrderBookSnapshotItemJson[]>(this.DATA_URL)
      .pipe(
        map((orderBookJson: OrderBookSnapshotItemJson[]) => 
          orderBookJson.map(orderBookItem => this.getTransformedJsonData(orderBookItem))
        )
      );
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
