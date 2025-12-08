import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClimateData, ClimateRecommendation } from '../models/climate.model';
import { CropRecommendationRequest, CropRecommendationResponse } from '../models/crop.model';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClimateService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/climate`;

    /**
     * Get climate data for a location
     */
    getClimateData(location: string): Observable<ClimateData> {
        return this.http.get<ClimateData>(`${this.apiUrl}/${location}`);
    }

    /**
     * Get climate recommendations
     */
    getClimateRecommendations(location: string, soilType: string, season: string): Observable<ClimateRecommendation> {
        return this.http.post<ClimateRecommendation>(`${this.apiUrl}/recommendations`, {
            location,
            soilType,
            season
        });
    }
}

@Injectable({
    providedIn: 'root'
})
export class CropService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/crops`;

    /**
     * Get crop recommendations
     */
    getCropRecommendations(request: CropRecommendationRequest): Observable<CropRecommendationResponse> {
        return this.http.post<CropRecommendationResponse>(`${this.apiUrl}/recommend`, request);
    }
}
