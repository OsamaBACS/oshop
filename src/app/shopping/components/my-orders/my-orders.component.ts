import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { OrderService } from '@shared/services/order.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from '@shared/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.orders$ = authService.user$.switchMap((u) =>
      orderService.getOrdersByUser(u.uid)
    );
  }
}
