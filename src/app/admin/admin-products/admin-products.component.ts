import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable, Subject } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: Product[];
  filteredProducts!: any[];

  // Angular-Datatables
  subscription: Subject<any> = new Subject<any>();
  tableResource: DataTables.Settings = {};

  items: Product[] = [];
  itemCount!: number;

  constructor(private productService: ProductService) {
    this.productService
      .getAll()
      .snapshotChanges()
      .subscribe((products) => {
        this.filteredProducts = this.items = products as [];
        // Initialize DataTable
        // this.initializeTable(products);
        this.subscription.next();
      });
  }

  private initializeTable(products: Product[]) {
    // this.tableResource = new DataTableResource(products);
    // this.tableResource
    //   .query({ offset: 0 })
    //   .then((items) => (this.items = items));
    // this.tableResource.count().then((count) => (this.itemCount = count));
  }

  reloadItems(params: any) {
    // if (!this.tableResource) return;
    // this.tableResource.query(params).then((items) => (this.items = items));
  }

  ngOnInit(): void {
    this.tableResource = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    // console.log(query);
    this.filteredProducts = query
      ? this.items.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.items;
  }
}
