import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '@shared/models/shopping-cart';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent {
  @Input('product') product!: any;
  @Input('shopping-cart') shoppingCart!: ShoppingCart; // From product.component.html
  @Input('productType') productType!: string;

  constructor(private shoppingCartService: ShoppingCartService) {}

  addToCart() {
    this.shoppingCartService.addToCart(this.product, this.productType);
    // console.log(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product, this.productType);
  }
}
