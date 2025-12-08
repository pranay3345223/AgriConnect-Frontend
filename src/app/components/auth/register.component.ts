import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h1>Join AgriConnect</h1>
          <p>Create your account to get started</p>
        </div>

        <form (ngSubmit)="onRegister()" #registerForm="ngForm">
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              [(ngModel)]="userData.fullName"
              required
              placeholder="Enter your full name"
              #fullName="ngModel"
            />
            @if (fullName.invalid && fullName.touched) {
              <small class="error">Full name is required</small>
            }
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="userData.username"
              required
              minlength="3"
              placeholder="Choose a username"
              #username="ngModel"
            />
            @if (username.invalid && username.touched) {
              <small class="error">Username must be at least 3 characters</small>
            }
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="userData.email"
              required
              email
              placeholder="your@email.com"
              #email="ngModel"
            />
            @if (email.invalid && email.touched) {
              <small class="error">Valid email is required</small>
            }
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="password-wrapper">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                [(ngModel)]="userData.password"
                required
                minlength="6"
                placeholder="Create a password"
                #password="ngModel"
              />
              <button type="button" class="password-toggle" (click)="togglePassword()">
                <i class="bi" [class.bi-eye]="!showPassword" [class.bi-eye-slash]="showPassword"></i>
              </button>
            </div>
            @if (password.invalid && password.touched) {
              <small class="error">Password must be at least 6 characters</small>
            }
          </div>

          <div class="form-group">
            <label for="phoneNumber">Phone Number (Optional)</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              [(ngModel)]="userData.phoneNumber"
              placeholder="Your phone number"
            />
          </div>

          <div class="form-group">
            <label for="userType">I am a...</label>
            <select
              id="userType"
              name="role"
              [(ngModel)]="userData.role"
              required
              #role="ngModel"
            >
              <option value="" disabled>Select your role</option>
              <option value="FARMER">Farmer</option>
              <option value="OWNER">Machine Owner</option>
            </select>
            @if (role.invalid && role.touched) {
              <small class="error">Please select your role</small>
            }
          </div>

          @if (errorMessage) {
            <div class="alert alert-error">{{ errorMessage }}</div>
          }

          @if (successMessage) {
            <div class="alert alert-success">{{ successMessage }}</div>
          }

          <button
            type="submit"
            class="btn-primary"
            [disabled]="registerForm.invalid || loading"
          >
            @if (loading) {
              <span>Creating Account...</span>
            } @else {
              <span>Register</span>
            }
          </button>
        </form>

        <div class="register-footer">
          <p>
            Already have an account?
            <a routerLink="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      padding: 2rem 1rem;
    }

    .register-card {
      background: white;
      border-radius: 12px;
      padding: 2.5rem;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .register-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .register-header h1 {
      color: #2d3748;
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }

    .register-header p {
      color: #718096;
      font-size: 0.95rem;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #4a5568;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #2ecc71;
    }

    .password-wrapper {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: #718096;
      padding: 0;
    }

    .password-toggle:hover {
      color: #4a5568;
    }

    .form-group select {
      cursor: pointer;
    }

    .error {
      color: #e53e3e;
      font-size: 0.85rem;
      margin-top: 0.25rem;
      display: block;
    }

    .alert {
      padding: 0.75rem;
      border-radius: 6px;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .alert-error {
      background-color: #fed7d7;
      color: #c53030;
      border: 1px solid #fc8181;
    }

    .alert-success {
      background-color: #c6f6d5;
      color: #2f855a;
      border: 1px solid #9ae6b4;
    }

    .btn-primary {
      width: 100%;
      padding: 0.875rem;
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      margin-top: 0.5rem;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .register-footer {
      text-align: center;
      margin-top: 1.5rem;
      color: #718096;
      font-size: 0.9rem;
    }

    .register-footer a {
      color: #2ecc71;
      text-decoration: none;
      font-weight: 500;
    }

    .register-footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      .register-card {
        padding: 2rem 1.5rem;
      }
    }
  `]
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userData: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    role: 'FARMER'
  };

  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onRegister(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.userData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
