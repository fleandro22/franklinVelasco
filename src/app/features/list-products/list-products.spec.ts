import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ListProducts } from './list-products';
import { ProductService, Product } from './data/product';

const createMockResource = (
  overrides: {
    hasValue?: boolean;
    value?: Product[] | { data: Product[] };
    isLoading?: boolean;
    error?: unknown;
  } = {},
) => ({
  hasValue: signal(overrides.hasValue ?? false),
  value: signal(overrides.value ?? []),
  isLoading: signal(overrides.isLoading ?? false),
  error: signal(overrides.error),
});

describe('ListProducts', () => {
  let component: ListProducts;
  let fixture: ComponentFixture<ListProducts>;
  let mockResource: ReturnType<typeof createMockResource>;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Producto Test',
      description: 'Descripción test',
      logo: 'logo.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01',
    },
  ];

  beforeEach(async () => {
    mockResource = createMockResource();

    await TestBed.configureTestingModule({
      imports: [ListProducts],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ProductService,
          useValue: { $listProductsResource: mockResource },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty array when resource has no value', () => {
    expect(component['$products']()).toEqual([]);
  });

  it('should return products when resource value is array', () => {
    mockResource.hasValue.set(true);
    mockResource.value.set(mockProducts);
    fixture.detectChanges();

    expect(component['$products']()).toEqual(mockProducts);
  });

  it('should return products from data property when value is object with data', () => {
    mockResource.hasValue.set(true);
    mockResource.value.set({ data: mockProducts });
    fixture.detectChanges();

    expect(component['$products']()).toEqual(mockProducts);
  });

  it('should show loading message when isLoading is true', () => {
    mockResource.isLoading.set(true);
    fixture.detectChanges();

    const root = fixture.nativeElement.shadowRoot ?? fixture.nativeElement;
    expect(root.textContent).toContain('Cargando productos');
  });

  it('should show error message when error exists', () => {
    mockResource.hasValue.set(false);
    mockResource.isLoading.set(false);
    mockResource.error.set(new Error('Error de red'));
    fixture.detectChanges();

    const root = fixture.nativeElement.shadowRoot ?? fixture.nativeElement;
    expect(root.textContent).toContain('Error al cargar los productos');
  });
});
