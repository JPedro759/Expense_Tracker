import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'maintenance',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component'),
  },
];
