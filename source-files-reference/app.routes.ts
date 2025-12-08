import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./components/auth/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/auth/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    // Placeholder routes - uncomment when components are created
    // {
    //   path: 'machines',
    //   children: [
    //     {
    //       path: '',
    //       loadComponent: () => import('./components/machines/machine-list.component').then(m => m.MachineListComponent)
    //     },
    //     {
    //       path: 'add',
    //       canActivate: [authGuard],
    //       loadComponent: () => import('./components/machines/machine-form.component').then(m => m.MachineFormComponent)
    //     },
    //     {
    //       path: ':id',
    //       loadComponent: () => import('./components/machines/machine-detail.component').then(m => m.MachineDetailComponent)
    //     }
    //   ]
    // },
    // {
    //   path: 'bookings',
    //   canActivate: [authGuard],
    //   loadComponent: () => import('./components/bookings/booking-list.component').then(m => m.BookingListComponent)
    // },
    // {
    //   path: 'climate',
    //   loadComponent: () => import('./components/climate/climate.component').then(m => m.ClimateComponent)
    // },
    // {
    //   path: 'crop-recommendation',
    //   loadComponent: () => import('./components/crop/crop-recommendation.component').then(m => m.CropRecommendationComponent)
    // },
    // {
    //   path: 'profile',
    //   canActivate: [authGuard],
    //   loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)
    // },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
