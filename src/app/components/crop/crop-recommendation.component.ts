import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-crop-recommendation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="text-center mb-4">
            <h2 class="display-5 fw-bold text-success mb-3">Crop Recommendation</h2>
            <p class="lead text-muted">Get AI-powered suggestions for the best crops to plant based on your soil and climate data.</p>
          </div>

          <!-- Mode Selector -->
          <div class="card shadow-sm border-0 mb-4">
            <div class="card-body p-4">
              <div class="d-flex justify-content-center align-items-center gap-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="mode" id="modeBasic" 
                         [value]="'BASIC'" [(ngModel)]="mode" (change)="onModeChange()">
                  <label class="form-check-label fw-bold" for="modeBasic">
                    🌾 Basic Mode
                  </label>
                  <p class="small text-muted mb-0">Simple soil type selection</p>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="mode" id="modeAdvanced" 
                         [value]="'ADVANCED'" [(ngModel)]="mode" (change)="onModeChange()">
                  <label class="form-check-label fw-bold" for="modeAdvanced">
                    🧪 Soil Health Card
                  </label>
                  <p class="small text-muted mb-0">Scientific soil test data</p>
                </div>
              </div>
              
              <div *ngIf="mode === 'ADVANCED'" class="alert alert-info mt-3 mb-0">
                <i class="bi bi-info-circle me-2"></i>
                <strong>What is Soil Health Card?</strong>
                <p class="mb-0 mt-1 small">Soil Health Card is a Government of India scheme providing farmers with detailed soil test reports. 
                <a href="https://soilhealth.dac.gov.in/" target="_blank" class="alert-link">Learn more <i class="bi bi-box-arrow-up-right"></i></a></p>
              </div>
            </div>
          </div>

          <!-- Forms -->
          <div class="card shadow border-0">
            <div class="card-body p-5">
              <form (ngSubmit)="getRecommendation()">
                <!-- Basic Mode Form -->
                <div *ngIf="mode === 'BASIC'">
                  <div class="row g-3">
                    <div class="col-md-4">
                      <label class="form-label">Soil Type</label>
                      <select class="form-select" [(ngModel)]="basicData.soilType" name="soilType" required>
                        <option value="">Select...</option>
                        <option value="clay">Clay</option>
                        <option value="loamy">Loamy</option>
                        <option value="sandy">Sandy</option>
                        <option value="black">Black</option>
                        <option value="red">Red</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Season</label>
                      <select class="form-select" [(ngModel)]="basicData.season" name="season" required>
                        <option value="">Select...</option>
                        <option value="monsoon">Monsoon/Kharif</option>
                        <option value="winter">Winter/Rabi</option>
                        <option value="summer">Summer/Zaid</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Location</label>
                      <div class="input-group">
                        <input type="text" class="form-control" [(ngModel)]="basicData.location" name="location" placeholder="e.g. Hyderabad">
                        <button type="button" class="btn btn-outline-success" (click)="useCurrentLocation()" 
                                [disabled]="loadingLocation" title="Use GPS location">
                          <i class="bi" [class.bi-geo-alt-fill]="!loadingLocation" [class.bi-geo-alt]="!loadingLocation"></i>
                          <span *ngIf="loadingLocation" class="spinner-border spinner-border-sm ms-1"></span>
                        </button>
                      </div>
                      <small class="text-muted" *ngIf="locationName">📍 {{locationName}}</small>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Temperature (°C)</label>
                      <input type="number" class="form-control" [(ngModel)]="basicData.temperature" name="temperature" placeholder="e.g. 26">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Humidity (%)</label>
                      <input type="number" class="form-control" [(ngModel)]="basicData.humidity" name="humidity" placeholder="e.g. 80">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Rainfall (mm)</label>
                      <input type="number" class="form-control" [(ngModel)]="basicData.rainfall" name="rainfall" placeholder="e.g. 200">
                    </div>
                  </div>
                </div>

                <!-- Advanced Mode Form -->
                <div *ngIf="mode === 'ADVANCED'">
                  <h5 class="mb-3 text-success">Soil Health Card Parameters</h5>
                  <div class="row g-3">
                    <div class="col-md-4">
                      <label class="form-label">pH Level <span class="text-danger">*</span></label>
                      <input type="number" class="form-control" [(ngModel)]="shcData.pH" name="pH" 
                             placeholder="e.g. 6.5" step="0.1" min="4" max="9" required>
                      <small class="text-muted">Range: 4.0 - 9.0</small>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Nitrogen (N) kg/ha <span class="text-danger">*</span></label>
                      <input type="number" class="form-control" [(ngModel)]="shcData.nitrogen" name="nitrogen" 
                             placeholder="e.g. 120" min="0" required>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Phosphorus (P) kg/ha <span class="text-danger">*</span></label>
                      <input type="number" class="form-control" [(ngModel)]="shcData.phosphorus" name="phosphorus" 
                             placeholder="e.g. 60" min="0" required>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Potassium (K) kg/ha <span class="text-danger">*</span></label>
                      <input type="number" class="form-control" [(ngModel)]="shcData.potassium" name="potassium" 
                             placeholder="e.g. 40" min="0" required>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Organic Carbon (%)</label>
                      <input type="number" class="form-control" [(ngModel)]="shcData.organicCarbon" name="organicCarbon" 
                             placeholder="e.g. 0.5" step="0.1" min="0" max="10">
                      <small class="text-muted">Optional: 0 - 10%</small>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">EC (dS/m)</label>
                      <input type="number" class="form-control" [(ngModel)]="shcData.electricalConductivity" name="ec" 
                             placeholder="e.g. 0.5" step="0.1" min="0">
                      <small class="text-muted">Optional</small>
                    </div>
                  </div>
                  
                  <h6 class="mt-4 mb-3 text-secondary">Climate Data (Optional)</h6>
                  <div class="row g-3">
                    <div class="col-md-4">
                      <label class="form-label">Temperature (°C)</label>
                      <input type="number" class="form-control" [(ngModel)]="shcData.temperature" name="temp" placeholder="e.g. 26">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Rainfall (mm)</label>
                      <input type="number" class="form-control" [(ngModel)]="shcData.rainfall" name="rain" placeholder="e.g. 200">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Humidity (%)</label>
                      <input type="number" class="form-control" [(ngModel)]="shcData.humidity" name="hum" placeholder="e.g. 80">
                    </div>
                  </div>
                </div>

                <div class="d-grid mt-5">
                  <button type="submit" class="btn btn-success btn-lg" [disabled]="loading">
                    <span *ngIf="!loading">
                      <i class="bi bi-search me-2"></i>Get Recommendations
                    </span>
                    <span *ngIf="loading">
                      <span class="spinner-border spinner-border-sm me-2"></span>Analyzing...
                    </span>
                  </button>
                </div>
              </form>

              <!-- Results -->
              <div *ngIf="recommendations && recommendations.length > 0" class="mt-5 fade-in">
                <hr class="my-4">
                <h4 class="text-center text-success mb-4">
                  <i class="bi bi-check-circle-fill me-2"></i>Recommended Crops
                </h4>
                <p class="text-center text-muted mb-4">{{message}}</p>
                
                <div class="row g-3">
                  <div class="col-md-6" *ngFor="let crop of recommendations; let i = index">
                    <div class="card h-100" [class.border-success]="i === 0">
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                          <h5 class="card-title text-success mb-0">{{crop.name}}</h5>
                          <span class="badge bg-success">{{crop.suitabilityScore}}%</span>
                        </div>
                        <p class="card-text small text-muted mt-2">{{crop.description}}</p>
                        <div class="small">
                          <div><strong>Yield:</strong> {{crop.yieldInfo}}</div>
                          <div><strong>Soil:</strong> {{crop.suitableSoil}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div *ngIf="error" class="alert alert-danger mt-4">
                <i class="bi bi-exclamation-triangle me-2"></i>{{error}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fade-in { animation: fadeIn 0.6s ease-in; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
    .form-check-input:checked { background-color: #28a745; border-color: #28a745; }
    .card.border-success { border-width: 2px !important; }
  `]
})
export class CropRecommendationComponent {
  private http = inject(HttpClient);

  mode: 'BASIC' | 'ADVANCED' = 'BASIC';

  basicData = {
    soilType: '',
    season: '',
    location: '',
    temperature: null as number | null,
    humidity: null as number | null,
    rainfall: null as number | null
  };

  shcData = {
    pH: null as number | null,
    nitrogen: null as number | null,
    phosphorus: null as number | null,
    potassium: null as number | null,
    organicCarbon: null as number | null,
    electricalConductivity: null as number | null,
    temperature: null as number | null,
    rainfall: null as number | null,
    humidity: null as number | null
  };

  recommendations: any[] = [];
  message = '';
  loading = false;
  loadingLocation = false;
  locationName = '';
  error = '';

  onModeChange() {
    this.recommendations = [];
    this.error = '';
  }

  useCurrentLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    this.loadingLocation = true;
    this.error = '';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Fetch weather data for these coordinates
        this.http.get<any>(`${environment.apiUrl}/weather/location?lat=${lat}&lon=${lon}`).subscribe({
          next: (weather) => {
            this.basicData.location = weather.location || 'Current Location';
            this.basicData.temperature = Math.round(weather.temperature);
            this.basicData.humidity = weather.humidity;
            this.basicData.rainfall = 0; // OpenWeather doesn't provide rainfall directly
            this.locationName = `${weather.location}, ${weather.country}`;
            this.loadingLocation = false;
          },
          error: (err) => {
            console.error('Weather API error:', err);
            alert('Failed to fetch weather data for your location');
            this.loadingLocation = false;
          }
        });
      },
      (err) => {
        console.error('Geolocation error:', err);
        alert('Unable to access your location. Please enable location permissions.');
        this.loadingLocation = false;
      }
    );
  }

  getRecommendation() {
    this.loading = true;
    this.error = '';
    this.recommendations = [];

    const requestBody: any = {
      mode: this.mode
    };

    if (this.mode === 'BASIC') {
      requestBody.soilType = this.basicData.soilType;
      requestBody.season = this.basicData.season;
      requestBody.location = this.basicData.location || 'India';
      requestBody.temperature = this.basicData.temperature;
      requestBody.humidity = this.basicData.humidity;
      requestBody.rainfall = this.basicData.rainfall;
    } else {
      requestBody.soilHealthData = this.shcData;
    }

    this.http.post<any>(`${environment.apiUrl}/crops/recommend`, requestBody).subscribe({
      next: (response) => {
        this.recommendations = response.recommendations || [];
        this.message = response.message || '';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to get recommendations. Please try again.';
        this.loading = false;
      }
    });
  }
}
