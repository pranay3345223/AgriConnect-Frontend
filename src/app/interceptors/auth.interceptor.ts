import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

/**
 * HTTP Interceptor to add JWT token to requests
 * and handle authentication errors
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    // Clone request and add authorization header if token exists
    let authReq = req;
    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Handle request and catch 401 errors
    return next(authReq).pipe(
        catchError((error) => {
            if (error.status === 401) {
                // Unauthorized - logout and redirect to login
                authService.logout();
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};
