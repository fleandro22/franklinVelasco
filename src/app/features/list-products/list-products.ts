import {
  Component,
  inject,
  computed,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { SearchProduct } from './components/search-product/search-product';
import { AddProduct } from './components/add-product/add-product';
import { ProductService, Product } from './data/product';

@Component({
  selector: 'app-list-products',
  imports: [SearchProduct, AddProduct],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ListProducts {
  protected readonly productService = inject(ProductService);

  /** Extrae el array del recurso que lista los productos*/
  protected readonly $products = computed(() => {
    const res = this.productService.$listProductsResource;
    if (!res.hasValue()) return [];
    const value = res.value();
    if (Array.isArray(value)) return value;
    if (value && typeof value === 'object' && Array.isArray((value as { data?: Product[] }).data)) {
      return (value as { data: Product[] }).data;
    }
    return [];
  });
}
