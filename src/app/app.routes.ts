import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.route').then(m => m.AUTH_ROUTE) },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canLoad: [AuthGuard]
  },
];
