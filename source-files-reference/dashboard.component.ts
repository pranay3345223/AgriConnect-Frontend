import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <div class="container">
          <h1>Welcome back, {{ currentUser?.fullName || 'User' }}! 🌾</h1>
          <p>Your AgriConnect Dashboard</p>
        </div>
      </div>

      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">🚜</div>
            <div class="stat-content">
              <h3>Machines</h3>
              <p class="stat-number">Browse</p>
              <a routerLink="/machines" class="stat-link">View Marketplace →</a>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-content">
              <h3>My Bookings</h3>
              <p class="stat-number">Manage</p>
              <a routerLink="/bookings" class="stat-link">View Bookings →</a>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🌤️</div>
            <div class="stat-content">
              <h3>Climate Info</h3>
              <p class="stat-number">Check</p>
              <a routerLink="/climate" class="stat-link">View Weather →</a>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🌱</div>
            <div class="stat-content">
              <h3>Crop Advice</h3>
              <p class="stat-number">Get</p>
              <a routerLink="/crop-recommendation" class="stat-link">Get Recommendations →</a>
            </div>
          </div>
        </div>

        <div class="quick-actions">
          <h2>Quick Actions</h2>
          <div class="actions-grid">
            <a routerLink="/machines" class="action-card">
              <div class="action-icon">🔍</div>
              <h3>Browse Machines</h3>
              <p>Find the perfect agricultural equipment</p>
            </a>

            @if (currentUser?.userType === 'MACHINE_OWNER' || currentUser?.userType === 'BOTH') {
              <a routerLink="/machines/add" class="action-card">
                <div class="action-icon">➕</div>
                <h3>List Your Machine</h3>
                <p>Add a machine to rent out</p>
              </a>
            }

            <a routerLink="/crop-recommendation" class="action-card">
              <div class="action-icon">🌾</div>
              <h3>Crop Recommendations</h3>
              <p>Get AI-powered crop suggestions</p>
            </a>

            <a routerLink="/profile" class="action-card">
              <div class="action-icon">👤</div>
              <h3>My Profile</h3>
              <p>Manage your account settings</p>
            </a>
          </div>
        </div>

        <div class="user-info">
          <h2>Account Information</h2>
          <div class="info-card">
            <div class="info-row">
              <span class="info-label">Username:</span>
              <span class="info-value">{{ currentUser?.username }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value">{{ currentUser?.email }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Role:</span>
              <span class="info-badge" [class]="'badge-' + currentUser?.userType?.toLowerCase()">
                {{ formatUserType(currentUser?.userType) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .dashboard {
      min-height: 100vh;
      background: #f7fafc;
    }

    .dashboard-header {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      padding: 3rem 0 2rem;
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .dashboard-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      gap: 1rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .stat-icon {
      font-size: 3rem;
      line-height: 1;
    }

    .stat-content {
      flex: 1;
    }

    .stat-content h3 {
      color: #2d3748;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    .stat-number {
      color: #2ecc71;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .stat-link {
      color: #4a5568;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
    }

    .stat-link:hover {
      color: #2ecc71;
    }

    .quick-actions,
    .user-info {
      margin-bottom: 3rem;
    }

    .quick-actions h2,
    .user-info h2 {
      color: #2d3748;
      margin-bottom: 1.5rem;
      font-size: 1.75rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .action-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
      border: 2px solid transparent;
    }

    .action-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 20px rgba(46, 204, 113, 0.2);
      border-color: #2ecc71;
    }

    .action-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .action-card h3 {
      color: #2d3748;
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }

    .action-card p {
      color: #718096;
      font-size: 0.95rem;
    }

    .info-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .info-label {
      color: #718096;
      font-weight: 500;
    }

    .info-value {
      color: #2d3748;
      font-weight: 600;
    }

    .info-badge {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .badge-farmer {
      background-color: #c6f6d5;
      color: #2f855a;
    }

    .badge-machine_owner {
      background-color: #bee3f8;
      color: #2c5282;
    }

    .badge-both {
      background-color: #fbd38d;
      color: #7c2d12;
    }

    @media (max-width: 768px) {
      .dashboard-header h1 {
        font-size: 2rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
    private authService = inject(AuthService);
    currentUser: User | null = null;

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
        });
    }

    formatUserType(type: string | undefined): string {
        if (!type) return 'User';
        return type.replace('_', ' ').split(' ')
            .map(word => word.charAt(0) + word.slice(1).toLowerCase())
            .join(' ');
    }
}
