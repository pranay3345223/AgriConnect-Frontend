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
    createMachine(machine: Machine): Observable<Machine> {
        return this.http.post<Machine>(this.apiUrl, machine);
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
