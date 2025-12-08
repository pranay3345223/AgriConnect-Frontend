import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, CreateBookingRequest } from '../models/booking.model';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/bookings`;

    /**
     * Create a new booking
     */
    createBooking(bookingData: CreateBookingRequest): Observable<Booking> {
        return this.http.post<Booking>(this.apiUrl, bookingData);
    }

    /**
     * Get all bookings for current user
     */
    getUserBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.apiUrl}/my-bookings`);
    }

    /**
     * Get booking by ID
     */
    getBookingById(id: number): Observable<Booking> {
        return this.http.get<Booking>(`${this.apiUrl}/${id}`);
    }

    /**
     * Update booking status
     */
    updateBookingStatus(id: number, status: string): Observable<Booking> {
        return this.http.put<Booking>(`${this.apiUrl}/${id}/status`, { status });
    }

    /**
     * Cancel booking
     */
    cancelBooking(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    /**
     * Get bookings for a specific machine
     */
    getMachineBookings(machineId: number): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.apiUrl}/machine/${machineId}`);
    }

    /**
     * Get bookings as machine owner
     */
    getOwnerBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.apiUrl}/owner-bookings`);
    }
}
