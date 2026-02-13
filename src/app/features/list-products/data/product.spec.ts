import { ApplicationRef, effect } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { ProductService, Product } from './product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have $listProductsResource', () => {
    expect(service.$listProductsResource).toBeDefined();
  });

  it('should fetch products from API', async () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Producto Test',
        description: 'Descripción',
        logo: 'logo.png',
        date_release: '2025-01-01',
        date_revision: '2026-01-01',
      },
    ];

    TestBed.runInInjectionContext(() => {
      effect(() => service.$listProductsResource.value());
    });

    TestBed.inject(ApplicationRef).tick();

    const req = httpMock.expectOne('/api/bp/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.$listProductsResource.value()).toEqual(mockProducts);
  });
});
