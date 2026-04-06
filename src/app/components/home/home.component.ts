import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <div class="container">
          <h1 class="hero-title">🌾 Welcome to AgriConnect</h1>
          <p class="hero-subtitle">Your Complete Agricultural Marketplace & Management Platform</p>
          
          @if (!isAuthenticated) {
            <div class="cta-buttons">
              <a routerLink="/login" class="btn btn-primary">
                <span>Login</span>
                <span class="icon">→</span>
              </a>
              <a routerLink="/register" class="btn btn-secondary">
                <span>Register</span>
                <span class="icon">✓</span>
              </a>
            </div>
          } @else {
            <div class="cta-buttons">
              <a routerLink="/dashboard" class="btn btn-primary">
                <span>Go to Dashboard</span>
                <span class="icon">→</span>
              </a>
              <button (click)="logout()" class="btn btn-secondary">
                <span>Logout</span>
                <span class="icon">✕</span>
              </button>
            </div>
          }
          
        </div>
      </div>

      <div class="features-section">
        <div class="container">
          <h2 class="section-title">What We Offer</h2>
          <div class="features-grid">
            <a routerLink="/machines" class="feature-card clickable">
              <div class="feature-icon">🚜</div>
              <h3>Machine Marketplace</h3>
              <p>Rent or list agricultural machinery with ease. Connect farmers with equipment owners.</p>
            </a>

            @if (isAuthenticated) {
              <a routerLink="/bookings" class="feature-card clickable">
                <div class="feature-icon">📅</div>
                <h3>Booking Management</h3>
                <p>Manage all your equipment bookings in one place. Track availability and schedules.</p>
              </a>
            } @else {
              <div class="feature-card" (click)="promptLogin('access bookings')">
                <div class="feature-icon">📅</div>
                <h3>Booking Management</h3>
                <p>Manage all your equipment bookings in one place. Track availability and schedules.</p>
                <small class="login-hint">Login to access</small>
              </div>
            }

            @if (isAuthenticated) {
              <a routerLink="/climate" class="feature-card clickable">
                <div class="feature-icon">🌤️</div>
                <h3>Climate Information</h3>
                <p>Get real-time weather data and forecasts to plan your agricultural activities.</p>
              </a>
            } @else {
              <div class="feature-card clickable" (click)="promptLogin('access climate info')">
                <div class="feature-icon">🌤️</div>
                <h3>Climate Information</h3>
                <p>Get real-time weather data and forecasts to plan your agricultural activities.</p>
                <small class="login-hint">Login to access</small>
              </div>
            }

            @if (isAuthenticated) {
              <a routerLink="/crop-recommendation" class="feature-card clickable">
                <div class="feature-icon">🌱</div>
                <h3>Crop Recommendations</h3>
                <p>AI-powered crop suggestions based on soil conditions, climate, and best practices.</p>
              </a>
            } @else {
              <div class="feature-card clickable" (click)="promptLogin('get crop recommendations')">
                <div class="feature-icon">🌱</div>
                <h3>Crop Recommendations</h3>
                <p>AI-powered crop suggestions based on soil conditions, climate, and best practices.</p>
                <small class="login-hint">Login to access</small>
              </div>
            }

            @if (isAuthenticated) {
              <a routerLink="/market-prices" class="feature-card clickable">
                <div class="feature-icon">💰</div>
                <h3>Market Insights</h3>
                <p>Stay updated with current market prices and trends for agricultural products.</p>
              </a>
            } @else {
               <div class="feature-card clickable" (click)="promptLogin('view market prices')">
                <div class="feature-icon">💰</div>
                <h3>Market Insights</h3>
                <p>Stay updated with current market prices and trends for agricultural products.</p>
                <small class="login-hint">Login to access</small>
              </div>
            }

            @if (isAuthenticated) {
              <a routerLink="/community" class="feature-card clickable">
                <div class="feature-icon">👥</div>
                <h3>Community Connect</h3>
                <p>Join a community of farmers and agricultural professionals.</p>
              </a>
            } @else {
              <div class="feature-card clickable" (click)="promptLogin('join the community')">
                <div class="feature-icon">👥</div>
                <h3>Community Connect</h3>
                <p>Join a community of farmers and agricultural professionals.</p>
                 <small class="login-hint">Login to access</small>
              </div>
            }
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="container">
          <p>© 2025 AgriConnect. Empowering Agriculture Through Technology.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: #f7fafc;
      user-select: none;
    }

    .hero-section {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      padding: 5rem 0;
      text-align: center;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      user-select: none;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      margin-bottom: 2.5rem;
      opacity: 0.95;
    }

    .cta-buttons {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2.5rem;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      border: none;
      user-select: none;
    }

    .btn-primary {
      background: white;
      color: #27ae60;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid white;
      backdrop-filter: blur(10px);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
    }

    .icon {
      font-size: 1.25rem;
    }

    .survey-cta {
      margin-top: 2rem;
      text-align: center;
    }

    .btn-survey {
      background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);
      font-size: 1.2rem;
      padding: 1.2rem 3rem;
    }

    .btn-survey:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(243, 156, 18, 0.4);
    }

    .survey-hint {
      margin-top: 0.75rem;
      font-size: 0.9rem;
      opacity: 0.9;
      color: white;
    }


    .features-section {
      padding: 5rem 0;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 3rem;
      user-select: none;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      border-radius: 16px;
      padding: 2.5rem;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 2px solid transparent;
      user-select: none;
      text-decoration: none;
      color: inherit;
      display: block;
      position: relative;
    }

    .feature-card.clickable {
      cursor: pointer;
    }

    .feature-card.clickable:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 24px rgba(46, 204, 113, 0.15);
      border-color: #2ecc71;
    }

    .feature-card.coming-soon {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .feature-card.coming-soon:hover {
      transform: none;
    }

    .feature-icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
    }

    .feature-card h3 {
      color: #2d3748;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: #718096;
      line-height: 1.6;
    }

    .login-hint {
      display: block;
      margin-top: 1rem;
      color: #2ecc71;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #fbbf24;
      color: #78350f;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .footer {
      background: #2d3748;
      color: white;
      padding: 2rem 0;
      text-align: center;
    }

    .footer p {
      margin: 0;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.2rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: stretch;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  isAuthenticated = false;

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }

  promptLogin(feature: string): void {
    if (confirm(`Please log in to ${feature}. Would you like to go to the login page?`)) {
      this.router.navigate(['/login']);
    }
  }
}
