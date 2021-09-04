import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from '@shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll(): AngularFireList<Product> {
    return this.db.list<Product>('/products');
  }

  get(productId: any) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: any, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: any) {
    return this.db.object('/products/' + productId).remove();
  }
}
