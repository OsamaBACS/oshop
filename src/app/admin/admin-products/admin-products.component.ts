import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: Product[];
  filteredProducts!: any[];
  subscription!: Subscription;
  tableResource!: DataTableResource<Product>;
  items: Product[] = [];
  itemCount!: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .valueChanges()
      .subscribe((products) => {
        this.filteredProducts = this.products = products as [];
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource
      .query({ offset: 0 })
      .then((items) => (this.items = items));

    this.tableResource.count().then((count) => (this.itemCount = count));
  }

  reloadItems(params: any) {
    if (!this.tableResource) return;

    this.tableResource.query(params).then((items) => (this.items = items));
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    // console.log(query);
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
}
