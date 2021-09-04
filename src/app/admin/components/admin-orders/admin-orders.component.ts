import { Component, OnInit } from '@angular/core';
import { Order } from '@shared/models/order';
import { OrderService } from '@shared/services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }

  ngOnInit(): void {}
}
