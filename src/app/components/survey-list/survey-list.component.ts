import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.model';

@Component({
    selector: 'app-survey-list',
    standalone: true,
    imports: [],
    template: '<p>Survey List Works</p>',
    styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
    surveys: Survey[] = [];
    filteredSurveys: Survey[] = [];
    loading = true;
    errorMessage = '';
    successMessage = '';

    // Filter options
    filterStatus = 'all';
    filterCrop = 'all';
    searchText = '';

    // Pagination
    currentPage = 1;
    itemsPerPage = 10;
    totalPages = 1;

    constructor(
        private surveyService: SurveyService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadMySurveys();
    }

    loadMySurveys(): void {
        this.loading = true;
        this.surveyService.getMySurveys().subscribe({
            next: (data) => {
                this.surveys = data;
                this.applyFilters();
                this.loading = false;
            },
            error: (error) => {
                this.errorMessage = 'Failed to load surveys. Please try again.';
                this.loading = false;
            }
        });
    }

    applyFilters(): void {
        let filtered = [...this.surveys];

        // Filter by status
        if (this.filterStatus !== 'all') {
            filtered = filtered.filter(s => s.status === this.filterStatus);
        }

        // Filter by crop type
        if (this.filterCrop !== 'all') {
            filtered = filtered.filter(s => s.cropType === this.filterCrop);
        }

        // Search filter
        if (this.searchText.trim()) {
            const search = this.searchText.toLowerCase();
            filtered = filtered.filter(s =>
                s.cropType.toLowerCase().includes(search) ||
                s.location.city.toLowerCase().includes(search) ||
                s.location.state.toLowerCase().includes(search) ||
                s.season.toLowerCase().includes(search)
            );
        }

        this.filteredSurveys = filtered;
        this.totalPages = Math.ceil(this.filteredSurveys.length / this.itemsPerPage);
        this.currentPage = 1;
    }

    getPaginatedSurveys(): Survey[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredSurveys.slice(startIndex, endIndex);
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    previousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    editSurvey(surveyId: string): void {
        this.router.navigate(['/surveys/edit', surveyId]);
    }

    deleteSurvey(surveyId: string): void {
        if (confirm('Are you sure you want to delete this survey?')) {
            this.surveyService.deleteSurvey(surveyId).subscribe({
                next: () => {
                    this.successMessage = 'Survey deleted successfully';
                    this.loadMySurveys();
                    setTimeout(() => this.successMessage = '', 3000);
                },
                error: (error) => {
                    this.errorMessage = 'Failed to delete survey';
                    setTimeout(() => this.errorMessage = '', 3000);
                }
            });
        }
    }

    updateStatus(surveyId: string, newStatus: string): void {
        this.surveyService.updateSurveyStatus(surveyId, newStatus).subscribe({
            next: () => {
                this.successMessage = 'Status updated successfully';
                this.loadMySurveys();
                setTimeout(() => this.successMessage = '', 3000);
            },
            error: (error) => {
                this.errorMessage = 'Failed to update status';
                setTimeout(() => this.errorMessage = '', 3000);
            }
        });
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Active': return 'status-active';
            case 'Completed': return 'status-completed';
            case 'Cancelled': return 'status-cancelled';
            default: return '';
        }
    }

    getUniqueCropTypes(): string[] {
        const crops = new Set(this.surveys.map(s => s.cropType));
        return Array.from(crops).sort();
    }

    formatDate(dateString: string): string {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    createNewSurvey(): void {
        this.router.navigate(['/surveys/new']);
    }
}
