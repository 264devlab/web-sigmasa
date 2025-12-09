import { Routes } from "@angular/router";

export const mainRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../../pages/home/home').then(m => m.HomeComponent),
        
    },
    {
        path: 'home',
        loadComponent: () => import('../../pages/home/home').then(m => m.HomeComponent),
    },
    {
        path: 'contact',
        loadComponent: () => import('../../pages/contact/contact').then(m => m.ContactComponent),
    },
    
];