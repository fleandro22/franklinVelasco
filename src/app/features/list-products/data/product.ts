import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';

export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

const API_URL = '/api/bp/products';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  readonly $listProductsResource = httpResource<Product[]>(() => API_URL);
}
