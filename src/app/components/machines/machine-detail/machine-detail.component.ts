import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MachineService } from '../../../services/machine.service';
import { Machine } from '../../../models/machine.model';

@Component({
  selector: 'app-machine-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="detail-container" *ngIf="machine">
      <div class="glass-panel detail-card">
        <div class="image-section" [style.background-image]="'url(' + getImageUrl(machine.imageUrl) + ')'">
          <button class="btn-back" routerLink="/machines"> Back</button>
        </div>

        <div class="content-section">
          <div class="header">
            <span class="type-badge">{{ machine.category }}</span>
            <h1>{{ machine.name }}</h1>
            <p class="location"> {{ machine.location }}</p>
          </div>

          <div class="price-box">
            <span class="label">Rent for</span>
            <span class="amount">\${{ machine.pricePerDay }}</span>
            <span class="unit">/ day</span>
          </div>

          <div class="description">
            <h3>Description</h3>
            <p>{{ machine.description }}</p>
          </div>

          <div class="owner-info">
            <h3>Owner Details</h3>
            <div class="info-row">
              <span> Name:</span>
              <strong>{{ machine.ownerName }}</strong>
            </div>
            <div class="info-row">
              <span> Contact:</span>
              <strong>{{ machine.ownerPhone }}</strong>
            </div>
          </div>

          <div class="actions">
            @if (machine.available) {
              <button class="btn-rent">Rent Now</button>
            } @else {
              <button class="btn-disabled" disabled>Currently Rented</button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      padding: 2rem;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .detail-card {
      width: 100%;
      max-width: 900px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    @media (min-width: 768px) {
      .detail-card {
        flex-direction: row;
      }
      .image-section {
        width: 50%;
        min-height: 500px;
      }
      .content-section {
        width: 50%;
      }
    }

    .image-section {
      min-height: 300px;
      background-size: cover;
      background-position: center;
      position: relative;
      background-color: #eee;
    }

    .btn-back {
      position: absolute;
      top: 1rem;
      left: 1rem;
      padding: 0.5rem 1rem;
      background: rgba(255,255,255,0.9);
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 600;
      color: #333;
      text-decoration: none;
    }

    .content-section {
      padding: 2.5rem;
    }

    .type-badge {
      background: #e8f5e9;
      color: #27ae60;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .header h1 {
      margin: 1rem 0 0.5rem;
      color: #2c3e50;
    }

    .location {
      color: #7f8c8d;
      margin-bottom: 2rem;
    }

    .price-box {
      background: #f8fafc;
      padding: 1.5rem;
      border-radius: 16px;
      text-align: center;
      margin-bottom: 2rem;
      border: 1px solid #eef2f6;
    }

    .price-box .amount {
      display: block;
      font-size: 2.5rem;
      font-weight: 800;
      color: #2ecc71;
      line-height: 1;
      margin: 0.5rem 0;
    }

    .owner-info {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #eee;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      color: #555;
    }

    .btn-rent {
      width: 100%;
      padding: 1rem;
      margin-top: 2rem;
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .btn-rent:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(46, 204, 113, 0.4);
    }
    
    .btn-disabled {
      width: 100%;
      padding: 1rem;
      margin-top: 2rem;
      background: #bdc3c7;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: not-allowed;
    }
  `]
})
export class MachineDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private machineService = inject(MachineService);
  machine: Machine | undefined;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.machineService.getMachineById(id).subscribe(m => this.machine = m);
    }
  }

  getImageUrl(path?: string): string {
    if (!path) return 'assets/images/placeholder-machine.jpg';
    if (path.startsWith('http')) return path;
    return `http://localhost:8080${path}`;
  }
}
