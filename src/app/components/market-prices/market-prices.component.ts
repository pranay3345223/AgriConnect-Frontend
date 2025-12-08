import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-market-prices',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container py-5">
      <h2 class="text-center mb-5 text-success display-5 fw-bold">Market Insights</h2>
      
      <div class="row">
        <div class="col-md-8 mx-auto">
          <div class="card shadow border-0">
            <div class="card-header bg-success text-white py-3">
              <h4 class="mb-0">Today's Commodity Prices</h4>
              <small>Live updates from local mandis</small>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover table-striped mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="ps-4">Crop / Commodity</th>
                      <th>Market</th>
                      <th>Price (₹/Quintal)</th>
                      <th class="pe-4 text-end">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of marketData">
                      <td class="ps-4 fw-bold">{{ item.crop }}</td>
                      <td>{{ item.market }}</td>
                      <td>₹{{ item.price }}</td>
                      <td class="pe-4 text-end">
                        <span class="badge" [ngClass]="item.trend === 'up' ? 'bg-success' : 'bg-danger'">
                          {{ item.trend === 'up' ? '▲' : '▼' }} {{ item.change }}%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="alert alert-info mt-4 d-flex align-items-center">
            <i class="bi bi-info-circle-fill me-2 fs-4"></i>
            <div>
              <strong>Note:</strong> Prices are indicative and subject to quality, grade, and market conditions.
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MarketPricesComponent {
    marketData = [
        { crop: 'Rice (Basmati)', market: 'Hyderabad', price: '4,200', trend: 'up', change: 1.5 },
        { crop: 'Wheat (Sharbati)', market: 'Delhi', price: '2,800', trend: 'down', change: 0.8 },
        { crop: 'Cotton', market: 'Warangal', price: '6,500', trend: 'up', change: 2.1 },
        { crop: 'Maize', market: 'Guntur', price: '2,100', trend: 'up', change: 0.5 },
        { crop: 'Turmeric', market: 'Nizamabad', price: '7,800', trend: 'down', change: 1.2 },
        { crop: 'Chilli (Red)', market: 'Guntur', price: '18,500', trend: 'up', change: 3.5 },
        { crop: 'Soybean', market: 'Indore', price: '4,600', trend: 'down', change: 0.9 },
        { crop: 'Groundnut', market: 'Rajkot', price: '5,900', trend: 'up', change: 1.1 }
    ];
}
