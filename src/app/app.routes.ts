import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
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
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'climate',
        canActivate: [authGuard],
        loadComponent: () => import('./components/climate/climate.component').then(m => m.ClimateComponent)
    },
    {
        path: 'crop-recommendation',
        canActivate: [authGuard],
        loadComponent: () => import('./components/crop/crop-recommendation.component').then(m => m.CropRecommendationComponent)
    },
    {
        path: 'market-prices',
        canActivate: [authGuard],
        loadComponent: () => import('./components/market-prices/market-prices.component').then(m => m.MarketPricesComponent)
    },
    {
        path: 'community',
        canActivate: [authGuard],
        loadComponent: () => import('./components/community/community.component').then(m => m.CommunityComponent)
    },
    {
        path: 'machines',
        children: [
            {
                path: '',
                loadComponent: () => import('./components/machines/machine-list/machine-list.component').then(m => m.MachineListComponent)
            },
            {
                path: 'add',
                canActivate: [authGuard],
                loadComponent: () => import('./components/machines/machine-form/machine-form.component').then(m => m.MachineFormComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./components/machines/machine-detail/machine-detail.component').then(m => m.MachineDetailComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
