import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'maintenance',
    loadComponent: () =>
      import('./components/maintenance/maintenance.component'),
  },
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
