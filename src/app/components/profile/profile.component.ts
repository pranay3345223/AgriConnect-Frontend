import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-header bg-white border-bottom-0 pt-4 pb-0">
              <h2 class="text-center mb-0 text-success">Edit Profile</h2>
            </div>
            
            <div class="card-body p-5">
              <div *ngIf="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                {{ successMessage }}
                <button type="button" class="btn-close" (click)="successMessage = ''"></button>
              </div>

              <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
                {{ errorMessage }}
                <button type="button" class="btn-close" (click)="errorMessage = ''"></button>
              </div>

              <form (ngSubmit)="onSubmit()" #profileForm="ngForm">
                <div class="mb-3">
                  <label for="fullName" class="form-label">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="fullName"
                    name="fullName"
                    [(ngModel)]="userData.fullName"
                  />
                </div>

                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    [(ngModel)]="userData.username"
                    required
                    minlength="3"
                  />
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    [(ngModel)]="userData.email"
                    required
                    email
                  />
                </div>

                <div class="mb-3">
                  <label for="phoneNumber" class="form-label">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    [(ngModel)]="userData.phoneNumber"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div class="mb-3">
                    <label class="form-label">Role</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        [value]="formatUserType(userData.role)" 
                        disabled 
                        readonly
                    >
                    <small class="text-muted">Role cannot be changed.</small>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <button type="button" class="btn btn-secondary me-md-2" (click)="goBack()">Cancel</button>
                  <button 
                    type="submit" 
                    class="btn btn-primary px-4"
                    [disabled]="profileForm.invalid || loading"
                  >
                    {{ loading ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --primary-green: #2d5016;
      --secondary-green: #4a7c2c;
      --light-green: #7fb539;
    }
    
    .text-success {
        color: var(--secondary-green) !important;
    }
    
    .btn-primary {
        background-color: var(--secondary-green);
        border-color: var(--secondary-green);
    }
    
    .btn-primary:hover {
        background-color: var(--primary-green);
        border-color: var(--primary-green);
    }

    .container {
      padding-bottom: 2rem;
    }
  `]
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  userData: any = {
    username: '',
    email: '',
    phoneNumber: '',
    fullName: '',
    role: ''
  };

  loading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userData = { ...user };
    } else {
      this.router.navigate(['/login']);
    }
  }

  formatUserType(type: string | undefined): string {
    if (!type) return '';
    return type.replace('_', ' ').split(' ')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.updateProfile(this.userData).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = 'Profile updated successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to update profile';
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
