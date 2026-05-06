import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { mainRoutes } from './core/routes/main.routes';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: mainRoutes,
    },
];

