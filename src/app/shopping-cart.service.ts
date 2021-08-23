import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.create().then((result) => {
        localStorage.setItem('cartId', result.key!);

        // Add product to Cart
        return this.getCart(result.key!);
      });
    } else {
      // Add Product to Cart
      this.getCart(cartId);
    }
  }
}
