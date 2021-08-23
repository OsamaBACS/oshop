import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: Product[] = [];

  category!: string;

  constructor(route: ActivatedRoute, productService: ProductService) {
    productService
      .getAll()
      .snapshotChanges()
      .pipe(
        switchMap((products) => {
          this.products = products as [];
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category')!;

        this.filteredProducts = this.category
          ? this.products.filter(
              (p) => p.payload.val().category === this.category
            )
          : this.products;
      });
  }
}
