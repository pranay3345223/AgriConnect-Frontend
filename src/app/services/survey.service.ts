import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Survey, SurveyStatistics } from '../models/survey.model';

@Injectable({
    providedIn: 'root'
})
export class SurveyService {
    private apiUrl = `${environment.apiUrl}/surveys`;

    constructor(private http: HttpClient) { }

    /**
     * Create new survey
     */
    createSurvey(survey: Survey): Observable<Survey> {
        return this.http.post<Survey>(this.apiUrl, survey);
    }

    /**
     * Get current user's surveys
     */
    getMySurveys(): Observable<Survey[]> {
        return this.http.get<Survey[]>(`${this.apiUrl}/my-surveys`);
    }

    /**
     * Get all active surveys
     */
    getActiveSurveys(): Observable<Survey[]> {
        return this.http.get<Survey[]>(`${this.apiUrl}/active`);
    }

    /**
     * Get survey by ID
     */
    getSurveyById(id: string): Observable<Survey> {
        return this.http.get<Survey>(`${this.apiUrl}/${id}`);
    }

    /**
     * Get surveys by location
     */
    getSurveysByLocation(city?: string, state?: string): Observable<Survey[]> {
        let params = new HttpParams();
        if (city) params = params.set('city', city);
        if (state) params = params.set('state', state);

        return this.http.get<Survey[]>(`${this.apiUrl}/by-location`, { params });
    }

    /**
     * Get surveys by machinery type
     */
    getSurveysByMachinery(machineType: string): Observable<Survey[]> {
        return this.http.get<Survey[]>(`${this.apiUrl}/by-machinery/${machineType}`);
    }

    /**
     * Get surveys by date range
     */
    getSurveysByDateRange(startDate: string, endDate: string): Observable<Survey[]> {
        const params = new HttpParams()
            .set('startDate', startDate)
            .set('endDate', endDate);

        return this.http.get<Survey[]>(`${this.apiUrl}/by-date-range`, { params });
    }

    /**
     * Get surveys by season
     */
    getSurveysBySeason(season: string): Observable<Survey[]> {
        return this.http.get<Survey[]>(`${this.apiUrl}/by-season/${season}`);
    }

    /**
     * Get surveys by crop type
     */
    getSurveysByCropType(cropType: string): Observable<Survey[]> {
        return this.http.get<Survey[]>(`${this.apiUrl}/by-crop/${cropType}`);
    }

    /**
     * Update survey
     */
    updateSurvey(id: string, survey: Survey): Observable<Survey> {
        return this.http.put<Survey>(`${this.apiUrl}/${id}`, survey);
    }

    /**
     * Update survey status
     */
    updateSurveyStatus(id: string, status: string): Observable<Survey> {
        const params = new HttpParams().set('status', status);
        return this.http.put<Survey>(`${this.apiUrl}/${id}/status`, null, { params });
    }

    /**
     * Delete survey
     */
    deleteSurvey(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    /**
     * Get statistics
     */
    getStatistics(): Observable<SurveyStatistics> {
        return this.http.get<SurveyStatistics>(`${this.apiUrl}/statistics`);
    }
}
