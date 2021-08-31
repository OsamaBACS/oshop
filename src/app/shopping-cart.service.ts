import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from './models/shopping-cart';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from './models/shopping-cart-item';
import { take } from 'rxjs/operators';

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

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(map((x: any) => new ShoppingCart(x.payload.val().items)));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<ShoppingCartItem>(
      '/shopping-carts/' + cartId + '/items/' + productId
    );
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }

  async addToCart(product: any) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: any, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$
      .valueChanges()
      .take(1)
      .subscribe((item) => {
        item$.update({
          title: product.payload.val().title,
          imageUrl: product.payload.val().imageUrl,
          price: product.payload.val().price,
          quantity: !item ? 1 : item.quantity + change,
        });
      });
  }
}
