import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-crop-recommendation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './crop-recommendation.component.html',
  styleUrls: ['./crop-recommendation.component.css']
})
export class CropRecommendationComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  mode: 'BASIC' | 'ADVANCED' = 'BASIC';
  recommendationForm!: FormGroup;
  recommendations: any[] = [];
  message = '';
  loading = false;
  loadingLocation = false;
  error = '';
  successMessage = '';

  // Dropdown options
  soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silt', 'Red Soil', 'Black Soil', 'Black'];

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.recommendationForm = this.fb.group({
      mode: ['BASIC'],

      // Basic mode fields
      soilType: ['', Validators.required],
      season: ['', Validators.required],
      location: [''],
      temperature: [null],
      humidity: [null],
      rainfall: [null],

      // Advanced mode fields
      soilHealthData: this.fb.group({
        pH: [null],
        nitrogen: [null],
        phosphorus: [null],
        potassium: [null],
        organicCarbon: [null],
        electricalConductivity: [null],
        temperature: [null],
        rainfall: [null],
        humidity: [null]
      })
    });
  }

  onModeChange() {
    this.recommendations = [];
    this.error = '';
    this.recommendationForm.patchValue({ mode: this.mode });
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

        this.http.get<any>(`${environment.apiUrl}/weather/location?lat=${lat}&lon=${lon}`).subscribe({
          next: (weather) => {
            this.recommendationForm.patchValue({
              location: weather.location || 'Current Location',
              temperature: Math.round(weather.temperature),
              humidity: weather.humidity
            });

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
    this.successMessage = '';
    this.recommendations = [];

    const formValue = this.recommendationForm.value;

    const requestBody: any = {
      mode: this.mode
    };

    if (this.mode === 'BASIC') {
      requestBody.soilType = formValue.soilType;
      requestBody.season = formValue.season;
      requestBody.location = formValue.location || 'India';
      requestBody.temperature = formValue.temperature;
      requestBody.humidity = formValue.humidity;
      requestBody.rainfall = formValue.rainfall;
    } else {
      requestBody.soilHealthData = formValue.soilHealthData;
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
