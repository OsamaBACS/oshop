import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@shared/services/product.service';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '@shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  category!: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        switchMap((products) => {
          this.products = products as [];
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category')!;
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((p) => p.payload.val().category === this.category)
      : this.products;
  }
}
