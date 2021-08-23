import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
// import { take } from 'rxjs/operators';
import 'rxjs/add/operator/take';

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

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }

  async addToCart(product: any) {
    let cartId = await this.getOrCreateCartId();
    let item$: AngularFireObject<any> = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .take(1)
      .subscribe((item) => {
        if (item.payload.val())
          item$.update({ quantity: item.payload.val().quantity + 1 });
        else item$.set({ product: product.payload.val(), quantity: 1 });
      });
  }
}
