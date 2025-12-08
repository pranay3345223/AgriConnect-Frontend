import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MachineService } from '../../../services/machine.service';
import { Machine } from '../../../models/machine.model';

@Component({
  selector: 'app-machine-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="form-container">
      <div class="glass-panel form-card">
        <div class="form-header">
          <h1>List Your Machine</h1>
          <p>Share your equipment with the community</p>
        </div>

        <form (ngSubmit)="onSubmit()" #form="ngForm">
          <div class="form-grid">
            <!-- Basic Info -->
            <div class="form-group">
              <label>Machine Name</label>
              <input type="text" [(ngModel)]="machine.name" name="name" required placeholder="e.g. John Deere 5050">
            </div>

            <div class="form-group">
              <label>Type</label>
              <select [(ngModel)]="machine.category" name="type" required>
                <option value="">Select Type</option>
                <option value="Tractor">Tractor</option>
                <option value="Harvester">Harvester</option>
                <option value="Seeder">Seeder</option>
                <option value="Sprayer">Sprayer</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <!-- Pricing & Location -->
            <div class="form-group">
              <label>Price per Day ($)</label>
              <input type="number" [(ngModel)]="machine.pricePerDay" name="price" required min="1">
            </div>

            <div class="form-group">
              <label>Location</label>
              <input type="text" [(ngModel)]="machine.location" name="location" required placeholder="City or Area">
            </div>

            <!-- Owner Info -->
            <div class="form-group">
              <label>Owner Name</label>
              <input type="text" [(ngModel)]="machine.ownerName" name="ownerName" required>
            </div>

            <div class="form-group">
              <label>Contact Number</label>
              <input type="tel" [(ngModel)]="machine.ownerPhone" name="contact" required>
            </div>

            <!-- Description -->
            <div class="form-group full-width">
              <label>Description</label>
              <textarea [(ngModel)]="machine.description" name="description" rows="4" required placeholder="Describe features, condition, etc."></textarea>
            </div>
            
            <!-- Image URL -->
             <div class="form-group full-width">
              <label>Image URL (Optional)</label>
              <input type="url" [(ngModel)]="machine.imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg">
            </div>
          </div>

          <div class="form-actions">
            <a routerLink="/machines" class="btn-cancel">Cancel</a>
            <button type="submit" class="btn-submit" [disabled]="form.invalid">List Machine</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 2rem;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding-top: 3rem;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .form-card {
      width: 100%;
      max-width: 800px;
      padding: 2.5rem;
    }

    .form-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .form-header h1 {
      margin: 0 0 0.5rem;
      color: #2c3e50;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #34495e;
    }

    .form-group input, .form-group select, .form-group textarea {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
      outline: none;
      border-color: #2ecc71;
    }

    .form-actions {
      margin-top: 2.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .btn-cancel {
      padding: 1rem 2rem;
      color: #7f8c8d;
      text-decoration: none;
      font-weight: 600;
    }

    .btn-submit {
      padding: 1rem 3rem;
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
      transition: transform 0.2s;
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: 600px) {
      .form-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class MachineFormComponent {
  private machineService = inject(MachineService);
  private router = inject(Router);

  machine: Machine = {
    name: '',
    category: '',
    description: '',
    location: '',
    pricePerDay: 0,
    ownerName: '',
    ownerPhone: '',
    available: true
  };

  onSubmit() {
    this.machineService.createMachine(this.machine).subscribe({
      next: () => this.router.navigate(['/machines']),
      error: (err) => console.error(err)
    });
  }
}
