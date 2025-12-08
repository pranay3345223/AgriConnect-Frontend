import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-climate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <h2 class="text-center mb-4 text-success display-5 fw-bold">Climate Information</h2>
      <p class="text-center text-muted mb-5">Real-time weather updates and forecasts for your farming location.</p>

      <!-- Loading State -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-success" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">{{ loadingMessage }}</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="alert alert-warning text-center mx-auto" style="max-width: 600px" role="alert">
        <h4 class="alert-heading"><i class="bi bi-exclamation-triangle"></i> Location Access Needed</h4>
        <p>{{ error }}</p>
        <hr>
        <p class="mb-0">Please enable location access in your browser settings to see local weather.</p>
        <p class="small text-muted mt-2">Note: Location access requires HTTPS or localhost.</p>
        <button class="btn btn-outline-success mt-3" (click)="getLocation()">Retry Location</button>
      </div>
      
      <!-- Manual Refresh Button (Visible when loaded) -->
      <div *ngIf="!loading && !error && weatherData" class="text-center mb-4">
        <button class="btn btn-sm btn-outline-secondary rounded-pill" (click)="getLocation()">
          <i class="bi bi-geo-alt"></i> Refresh Location
        </button>
      </div>

      <!-- Weather Content -->
      <div *ngIf="!loading && !error && weatherData" class="row justify-content-center fade-in">
        <!-- Current Weather Card -->
        <div class="col-md-6 mb-4">
          <div class="card shadow-lg border-0 h-100">
            <div class="card-body text-center p-5">
              <div class="icon mb-3">{{ getWeatherIcon(weatherData.current_weather.weathercode) }}</div>
              <h3 class="card-title mb-0">Current Weather</h3>
              <p class="text-muted"><i class="bi bi-geo-alt-fill text-danger"></i> Your Location ({{ latitude | number:'1.2-2' }}, {{ longitude | number:'1.2-2' }})</p>
              
              <div class="display-1 fw-bold text-success my-4">{{ weatherData.current_weather.temperature }}°C</div>
              
              <div class="row mt-4">
                <div class="col-6">
                  <div class="fw-bold fs-5">Wind Speed</div>
                  <div class="text-muted">{{ weatherData.current_weather.windspeed }} km/h</div>
                </div>
                <div class="col-6">
                  <div class="fw-bold fs-5">Direction</div>
                  <div class="text-muted">{{ weatherData.current_weather.winddirection }}°</div>
                </div>
              </div>
               <p class="mt-4 badge bg-light text-dark border">{{ getWeatherDescription(weatherData.current_weather.weathercode) }}</p>
            </div>
          </div>
        </div>

        <!-- Forecast Card -->
        <div class="col-md-8 mt-4">
          <div class="card shadow border-0">
            <div class="card-header bg-white border-0 pt-4 px-4">
              <h4 class="mb-0 text-success">7-Day Forecast</h4>
            </div>
            <div class="card-body p-4">
              <div class="row flex-nowrap overflow-auto pb-2">
                <div class="col-auto" *ngFor="let day of forecastDays; let i = index">
                   <div class="p-3 border rounded bg-light text-center" style="min-width: 120px;">
                    <div class="fw-bold mb-2">{{ day }}</div>
                    <div class="fs-2 mb-2">{{ getWeatherIcon(weatherData.daily.weathercode[i]) }}</div>
                    <div class="fw-bold text-success">{{ weatherData.daily.temperature_2m_max[i] }}°C</div>
                    <div class="small text-muted">{{ weatherData.daily.temperature_2m_min[i] }}°C</div>
                    <small class="d-block mt-2 text-muted" style="font-size: 0.8rem; line-height: 1.2">
                        {{ getWeatherDescription(weatherData.daily.weathercode[i]) }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .icon { font-size: 4rem; }
    .display-1 { font-size: 5rem; letter-spacing: -2px; }
    .fade-in { animation: fadeIn 0.8s ease-in; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    /* Hide scrollbar for cleaner look */
    .overflow-auto::-webkit-scrollbar { height: 6px; }
    .overflow-auto::-webkit-scrollbar-thumb { background-color: #ccc; border-radius: 4px; }
  `]
})
export class ClimateComponent implements OnInit {
  private http = inject(HttpClient);

  weatherData: any = null;
  loading = true;
  loadingMessage = 'Getting your location...';
  error = '';
  latitude: number = 0;
  longitude: number = 0;
  forecastDays: string[] = [];

  ngOnInit() {
    console.log('Climate Component Initialized - Real Weather Version');
    this.getLocation();
  }

  getLocation() {
    this.loading = true;
    this.error = '';
    this.loadingMessage = 'Requesting location access...';

    // Check for Secure Context (HTTPS)
    if (!window.isSecureContext && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      this.error = 'Geolocation requires a secure connection (HTTPS). Please use localhost or setup SSL.';
      this.loading = false;
      return;
    }

    if (!navigator.geolocation) {
      this.error = 'Geolocation is not supported by your browser';
      this.loading = false;
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.loadingMessage = 'Fetching weather data...';
        this.getWeatherData(this.latitude, this.longitude);
      },
      (err) => {
        console.error('Geolocation Error:', err);
        this.loading = false;
        switch (err.code) {
          case err.PERMISSION_DENIED:
            this.error = 'Location permission denied. Please enable it in your browser settings.';
            break;
          case err.POSITION_UNAVAILABLE:
            this.error = 'Location information is unavailable.';
            break;
          case err.TIMEOUT:
            this.error = 'The request to get user location timed out.';
            break;
          default:
            this.error = 'An unknown error occurred getting location.';
            break;
        }
      },
      options
    );
  }

  getWeatherData(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

    this.http.get(url).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        this.generateForecastDays(data.daily.time);
        this.loading = false;
      },
      error: (err) => {
        console.error('Weather API Error', err);
        this.error = 'Failed to fetch weather data from API.';
        this.loading = false;
      }
    });
  }

  generateForecastDays(dates: string[]) {
    this.forecastDays = dates.map(dateStr => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    });
  }

  // WMO Weather interpretation codes (0-99)
  getWeatherIcon(code: number): string {
    if (code === 0) return '☀️'; // Clear sky
    if (code === 1 || code === 2 || code === 3) return '⛅'; // Mainly clear, partly cloudy, and overcast
    if (code === 45 || code === 48) return '🌫️'; // Fog
    if (code >= 51 && code <= 55) return '🌧️'; // Drizzle
    if (code >= 61 && code <= 67) return '🌧️'; // Rain
    if (code >= 71 && code <= 77) return '❄️'; // Snow
    if (code >= 80 && code <= 82) return '🌦️'; // Rain showers
    if (code >= 95 && code <= 99) return '⛈️'; // Thunderstorm
    return '❓';
  }

  getWeatherDescription(code: number): string {
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog',
      51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
      61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
      71: 'Slight Snow', 73: 'Moderate Snow', 75: 'Heavy Snow',
      80: 'Slight Rain Showers', 81: 'Moderate Rain Showers', 82: 'Violent Rain Showers',
      95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Heavy Hailstorm'
    };
    return descriptions[code] || 'Unknown Weather';
  }
}
