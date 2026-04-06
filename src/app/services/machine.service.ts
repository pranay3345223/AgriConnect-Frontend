import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine, MachineSearchParams } from '../models/machine.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MachineService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/machines`;

    /**
     * Get all machines
     */
    getAllMachines(): Observable<Machine[]> {
        return this.http.get<Machine[]>(this.apiUrl);
    }

    /**
     * Search machines with filters
     */
    searchMachines(params: MachineSearchParams): Observable<Machine[]> {
        let httpParams = new HttpParams();

        if (params.category) httpParams = httpParams.set('category', params.category);
        if (params.location) httpParams = httpParams.set('location', params.location);
        if (params.minPrice) httpParams = httpParams.set('minPrice', params.minPrice.toString());
        if (params.maxPrice) httpParams = httpParams.set('maxPrice', params.maxPrice.toString());
        if (params.available !== undefined) httpParams = httpParams.set('available', params.available.toString());
        if (params.search) httpParams = httpParams.set('search', params.search);

        return this.http.get<Machine[]>(`${this.apiUrl}/search`, { params: httpParams });
    }

    /**
     * Get machine by ID
     */
    getMachineById(id: number): Observable<Machine> {
        return this.http.get<Machine>(`${this.apiUrl}/${id}`);
    }

    /**
     * Create new machine
     */
    createMachine(machine: Machine, image?: File): Observable<Machine> {
        const formData = new FormData();
        
        // Map Angular model properties to Spring Boot DTO properties
        formData.append('name', machine.name || '');
        formData.append('machineType', machine.category || 'Other');
        formData.append('description', machine.description || '');
        formData.append('location', machine.location || '');
        formData.append('pricePerDay', (machine.pricePerDay || 0).toString());
        formData.append('ownerName', machine.ownerName || 'Unknown');
        formData.append('ownerContact', machine.ownerPhone || '0000000000');
        formData.append('available', String(machine.available !== false));
        
        // Default coordinates required by backend validation
        formData.append('latitude', '0.0');
        formData.append('longitude', '0.0');
        
        if (image) {
            formData.append('image', image);
        }
        
        return this.http.post<Machine>(this.apiUrl, formData);
    }

    /**
     * Update machine
     */
    updateMachine(id: number, machine: Machine): Observable<Machine> {
        return this.http.put<Machine>(`${this.apiUrl}/${id}`, machine);
    }

    /**
     * Delete machine
     */
    deleteMachine(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    /**
     * Get machines by owner
     */
    getMachinesByOwner(ownerId: number): Observable<Machine[]> {
        return this.http.get<Machine[]>(`${this.apiUrl}/owner/${ownerId}`);
    }

    /**
     * Get available machines
     */
    getAvailableMachines(): Observable<Machine[]> {
        return this.http.get<Machine[]>(`${this.apiUrl}/available`);
    }
}
