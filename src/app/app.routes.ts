import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { ListProducts } from './features/list-products/list-products';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'list-products', pathMatch: 'full' },
      { path: 'list-products', component: ListProducts },
    ],
  },
];
