import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: { title: string }[];
  filteredProducts!: any[];
  subscription!: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .snapshotChanges()
      .subscribe(
        (products) => (this.filteredProducts = this.products = products as [])
      );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) => console.log(p.title))
      : this.products;
  }
}
