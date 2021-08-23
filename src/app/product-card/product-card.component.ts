import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product!: any;
  @Input('show-actions') showActions = true;

  constructor(private shoppingCartService: ShoppingCartService) {}

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }
}
