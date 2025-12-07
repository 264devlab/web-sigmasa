import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout';
import { mainRoutes } from './core/routes/main.routes';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: mainRoutes,
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    }
];
