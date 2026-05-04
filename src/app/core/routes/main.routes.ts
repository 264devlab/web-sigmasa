import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../../pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'home',
        loadComponent: () => import('../../pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'services',
        loadComponent: () => import('../../pages/contact/contact.component').then((m) => m.ContactComponent),
    },
    {
        path: 'projects',
        loadComponent: () => import('../../pages/contact/contact.component').then((m) => m.ContactComponent),
    },
    {
        path: 'mining',
        loadComponent: () => import('../../pages/contact/contact.component').then((m) => m.ContactComponent),
    },
];