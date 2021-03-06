import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import 'rxjs/add/operator/take';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingCart } from '@shared/models/shopping-cart';
import { Product } from '@shared/models/product';
import { ShoppingCartItem } from '@shared/models/shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(map((x: any) => new ShoppingCart(x.payload.val().items)));
  }

  async addToCart(product: any, productType: string) {
    this.updateItem(product, 1, productType);
  }

  async removeFromCart(product: Product, productType: string) {
    this.updateItem(product, -1, productType);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
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

  private async updateItem(product: any, change: number, productType: string) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .take(1)
      .subscribe((item) => {
        let quantity = !item ? 1 : item.quantity + change;
        if (quantity === 0) item$.remove();
        else
          item$.update({
            title:
              productType !== 'shopping'
                ? product.payload.val().title
                : product.title,
            imageUrl:
              productType !== 'shopping'
                ? product.payload.val().imageUrl
                : product.imageUrl,
            price:
              productType !== 'shopping'
                ? product.payload.val().price
                : product.price,
            quantity: quantity,
          });
      });
  }
}
