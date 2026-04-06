import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.model';

@Component({
    selector: 'app-survey-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './survey-form.component.html',
    styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
    surveyForm!: FormGroup;
    isSubmitting = false;
    errorMessage = '';
    successMessage = '';
    loadingLocation = false;
    currentDate = new Date();


    // Dropdown options
    cropTypes = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Soybean', 'Pulses', 'Vegetables', 'Other'];
    seasons = ['Kharif', 'Rabi', 'Zaid'];
    farmSizeUnits = ['acres', 'hectares'];
    cropStages = ['Seedling', 'Vegetative', 'Flowering', 'Harvesting'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    constructor(
        private fb: FormBuilder,
        private surveyService: SurveyService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {
        this.surveyForm = this.fb.group({
            // Section 1: Farm Information
            farmerName: ['', Validators.required],
            farmerPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            farmerEmail: ['', Validators.email],
            village: [''],

            location: this.fb.group({
                address: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
                pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
                latitude: [null],
                longitude: [null]
            }),

            farmSize: ['', [Validators.required, Validators.min(0.1)]],
            farmSizeUnit: ['acres', Validators.required],

            // Section 2: Current Crops
            currentCrops: this.fb.array([this.createCurrentCropItem()]),

            // Section 3: Future Crop Planning
            planningNextCrop: [false],
            nextCropType: [''],
            nextCropPlannedArea: [null],
            nextCropPlantingMonth: [''],

            // Section 4: Feedback
            additionalNotes: [''],

            // Legacy fields for compatibility
            cropType: [''],
            season: [''],
            plantingDate: [null],
            harvestDate: [null],
            soilType: [''],
            irrigationType: [''],
            machineryNeeded: this.fb.array([])
        });

        // Watch for planning toggle changes
        this.surveyForm.get('planningNextCrop')?.valueChanges.subscribe(planning => {
            const nextCropType = this.surveyForm.get('nextCropType');
            const nextCropPlannedArea = this.surveyForm.get('nextCropPlannedArea');
            const nextCropPlantingMonth = this.surveyForm.get('nextCropPlantingMonth');

            if (planning) {
                nextCropType?.setValidators([Validators.required]);
                nextCropPlannedArea?.setValidators([Validators.required, Validators.min(0.1)]);
                nextCropPlantingMonth?.setValidators([Validators.required]);
            } else {
                nextCropType?.clearValidators();
                nextCropPlannedArea?.clearValidators();
                nextCropPlantingMonth?.clearValidators();
            }

            nextCropType?.updateValueAndValidity();
            nextCropPlannedArea?.updateValueAndValidity();
            nextCropPlantingMonth?.updateValueAndValidity();
        });
    }

    createCurrentCropItem(): FormGroup {
        return this.fb.group({
            cropName: ['', Validators.required],
            cropVariety: [''],
            plantedArea: ['', [Validators.required, Validators.min(0.1)]],
            sowingDate: ['', Validators.required],
            cropStage: ['']
        });
    }

    get currentCrops(): FormArray {
        return this.surveyForm.get('currentCrops') as FormArray;
    }

    addCurrentCrop(): void {
        this.currentCrops.push(this.createCurrentCropItem());
    }

    removeCurrentCrop(index: number): void {
        if (this.currentCrops.length > 1) {
            this.currentCrops.removeAt(index);
        }
    }

    useCurrentLocation(): void {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        this.loadingLocation = true;
        this.errorMessage = '';

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                this.surveyForm.get('location')?.patchValue({
                    latitude: lat,
                    longitude: lon
                });

                this.loadingLocation = false;
                this.successMessage = `✓ GPS coordinates captured: ${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                setTimeout(() => this.successMessage = '', 3000);
            },
            (err) => {
                console.error('Geolocation error:', err);
                this.errorMessage = 'Unable to access your location. Please enable location permissions.';
                this.loadingLocation = false;
            }
        );
    }

    onSubmit(): void {
        if (this.surveyForm.valid) {
            this.isSubmitting = true;
            this.errorMessage = '';

            const surveyData: Survey = this.surveyForm.value;

            this.surveyService.createSurvey(surveyData).subscribe({
                next: (response) => {
                    this.successMessage = '✅ Survey submitted successfully!';
                    setTimeout(() => {
                        this.router.navigate(['/surveys/my-surveys']);
                    }, 2000);
                },
                error: (error) => {
                    this.errorMessage = error.error?.message || 'Failed to submit survey. Please try again.';
                    this.isSubmitting = false;
                }
            });
        } else {
            this.errorMessage = 'Please fill in all required fields correctly';
            this.markFormGroupTouched(this.surveyForm);
        }
    }

    private markFormGroupTouched(formGroup: FormGroup | FormArray) {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsTouched();

            if (control instanceof FormGroup || control instanceof FormArray) {
                this.markFormGroupTouched(control);
            }
        });
    }
}
