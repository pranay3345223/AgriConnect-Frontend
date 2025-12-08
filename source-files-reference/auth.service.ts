import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginRequest, LoginResponse, RegisterRequest } from '../models/user.model';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    public currentUser$ = this.currentUserSubject.asObservable();

    private readonly TOKEN_KEY = 'access_token';
    private readonly USER_KEY = 'current_user';

    constructor() { }

    /**
     * Login user with credentials
     */
    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/signin`, credentials)
            .pipe(
                tap(response => {
                    this.setSession(response);
                })
            );
    }

    /**
     * Register new user
     */
    register(userData: RegisterRequest): Observable<any> {
        return this.http.post(`${environment.apiUrl}/auth/signup`, userData);
    }

    /**
     * Logout user
     */
    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * Get current authentication token
     */
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    /**
     * Get current user
     */
    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    /**
     * Set authentication session
     */
    private setSession(authResult: LoginResponse): void {
        localStorage.setItem(this.TOKEN_KEY, authResult.accessToken);
        localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
        this.currentUserSubject.next(authResult.user);
    }

    /**
     * Get user from local storage
     */
    private getUserFromStorage(): User | null {
        const userJson = localStorage.getItem(this.USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    }

    /**
     * Request password reset
     */
    forgotPassword(email: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/auth/forgot-password`, { email });
    }

    /**
     * Reset password with token
     */
    resetPassword(token: string, newPassword: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/auth/reset-password`, {
            token,
            newPassword
        });
    }
}
