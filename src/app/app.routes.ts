import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  {
    path: 'events',
    loadChildren: () => import('./gestion-event/gestion-event.routes').then((m) => m.EVENT_ROUTES),
  },
  { path: 'about', component: About },
  { path: '**', component: NotFound },
];
