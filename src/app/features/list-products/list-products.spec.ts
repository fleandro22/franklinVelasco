import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ListProducts } from './list-products';

describe('ListProducts', () => {
  let component: ListProducts;
  let fixture: ComponentFixture<ListProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProducts],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
