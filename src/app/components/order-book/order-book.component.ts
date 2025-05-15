import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { OrderBookSnapshot } from '../../models/models';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-order-book',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './order-book.component.html',
  styleUrl: './order-book.component.scss'
})
export class OrderBookComponent implements OnChanges {
  @Input() snapshot!: OrderBookSnapshot | null;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['snapshot'] && this.snapshot) {
      this.prepareChartData();
    }
  }

  private prepareChartData(): void {
    const labels = this.snapshot!.bids.map(bid => bid.price.toFixed(4)).reverse()
      .concat(this.snapshot!.asks.map(ask => ask.price.toFixed(4)));

    const bidSizes = this.snapshot!.bids.map(bid => bid.size).reverse();
    const askSizes = this.snapshot!.asks.map(ask => ask.size);

    this.barChartData = {
      labels,
      datasets: [
        {
          label: 'Bids',
          data: [...bidSizes, ...Array(10).fill(0)],
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          stack: 'stack1'
        },
        {
          label: 'Asks',
          data: [...Array(10).fill(0), ...askSizes],
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
          stack: 'stack1'
        }
      ]
    };
  }
}
