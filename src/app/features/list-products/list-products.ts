import { Component } from '@angular/core';
import { SearchProduct } from './components/search-product/search-product';
import { AddProduct } from './components/add-product/add-product';

@Component({
  selector: 'app-list-products',
  imports: [SearchProduct, AddProduct],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
})
export class ListProducts {}
