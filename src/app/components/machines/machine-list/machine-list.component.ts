import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MachineService } from '../../../services/machine.service';
import { Machine } from '../../../models/machine.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-machine-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="marketplace-container">
      <div class="header-section">
        <h1>Machine Marketplace</h1>
        <p>Find the right equipment for your farm</p>
      </div>

      <!-- Search & Filter -->
      <div class="search-bar glass-panel">
        <div class="search-input">
          <span class="icon"></span>
          <input 
            type="text" 
            placeholder="Search by location..." 
            [(ngModel)]="searchLocation"
            (keyup.enter)="search()"
          >
        </div>
        <div class="filter-select">
          <select [(ngModel)]="selectedType" (change)="search()">
            <option value="">All Types</option>
            <option value="Tractor">Tractors</option>
            <option value="Harvester">Harvesters</option>
            <option value="Seeder">Seeders</option>
            <option value="Sprayer">Sprayers</option>
          </select>
        </div>
        <button class="btn-search" (click)="search()">Search</button>
      </div>

      <!-- Machine Grid -->
      <div class="machine-grid">
        @for (machine of machines$ | async; track machine.id) {
          <div class="machine-card glass-panel">
            <div class="card-image" [style.background-image]="'url(' + (machine.imageUrl || 'assets/images/placeholder-machine.jpg') + ')'">
              <div class="price-tag">\${{ machine.pricePerDay }}/day</div>
            </div>
            
            <div class="card-content">
              <div class="machine-type">{{ machine.category }}</div>
              <h3>{{ machine.name }}</h3>
              <p class="location-text"> {{ machine.location }}</p>
              
              <div class="card-footer">
                <span class="status" [class.available]="machine.available">
                  {{ machine.available ? 'Available' : 'Rented' }}
                </span>
                <a [routerLink]="['/machines', machine.id]" class="btn-details">
                  View Details 
                </a>
              </div>
            </div>
          </div>
        } @empty {
          <div class="no-results glass-panel">
            <p>No machines found matching your criteria.</p>
          </div>
        }
      </div>
      
      <!-- Floating Action Button for Owners -->
      <a routerLink="/machines/add" class="fab-add">
        +
      </a>
    </div>
  `,
  styles: [`
    .marketplace-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
    }

    .header-section {
      text-align: center;
      margin-bottom: 3rem;
      color: #2c3e50;
    }

    .header-section h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Glass Panel Utility */
    .glass-panel {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    /* Search Bar */
    .search-bar {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      margin-bottom: 2rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-input {
      flex: 1;
      position: relative;
      min-width: 200px;
    }

    .search-input input {
      width: 100%;
      padding: 0.75rem 0.75rem 0.75rem 2.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .search-input .icon {
      position: absolute;
      left: 0.8rem;
      top: 50%;
      transform: translateY(-50%);
      color: #95a5a6;
    }

    .filter-select select {
      padding: 0.75rem 1.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      font-size: 1rem;
      cursor: pointer;
    }

    .btn-search {
      padding: 0.75rem 2rem;
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(46, 204, 113, 0.2);
      transition: transform 0.2s;
    }

    .btn-search:hover {
      transform: translateY(-2px);
    }

    /* Grid */
    .machine-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .machine-card {
      transition: transform 0.3s, box-shadow 0.3s;
      overflow: hidden;
    }

    .machine-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    }

    .card-image {
      height: 200px;
      background-color: #f0f0f0;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .price-tag {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      backdrop-filter: blur(4px);
    }

    .card-content {
      padding: 1.5rem;
    }

    .machine-type {
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 700;
      color: #7f8c8d;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
    }

    .machine-card h3 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      color: #2c3e50;
    }

    .location-text {
      color: #7f8c8d;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #f0f0f0;
      padding-top: 1rem;
    }

    .status {
      font-size: 0.85rem;
      font-weight: 600;
      color: #e74c3c;
    }

    .status.available {
      color: #27ae60;
    }

    .btn-details {
      color: #2980b9;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: color 0.2s;
    }

    .btn-details:hover {
      color: #3498db;
    }

    .fab-add {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #f1c40f 0%, #f39c12 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(241, 196, 15, 0.4);
      transition: transform 0.3s;
      z-index: 100;
    }

    .fab-add:hover {
      transform: scale(1.1) rotate(90deg);
    }
    
    .no-results {
      grid-column: 1 / -1;
      padding: 3rem;
      text-align: center;
      color: #7f8c8d;
    }
  `]
})
export class MachineListComponent implements OnInit {
  private machineService = inject(MachineService);
  machines$: Observable<Machine[]> = new Observable();

  searchLocation = '';
  selectedType = '';

  ngOnInit() {
    this.refreshMachines();
  }

  refreshMachines() {
    this.machines$ = this.machineService.getAllMachines();
  }

  search() {
    if (!this.searchLocation && !this.selectedType) {
      this.refreshMachines();
    } else {
      this.machines$ = this.machineService.searchMachines({
        location: this.searchLocation || undefined,
        category: this.selectedType || undefined
      });
    }
  }
}
