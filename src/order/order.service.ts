import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.model';
import { Topping } from './order.model';
import { startOrder } from './orderWork/index';

@Injectable()
export class OrderService {
  private orders: Order[] = [];

  async addOrder(toppings: Topping[]) {
    const readyOrder = await startOrder(toppings);
    this.orders.push(readyOrder);

    if (!readyOrder) {
      throw new NotFoundException('The order is not created');
    }

    return readyOrder;
  }

  getAll() {
    return [...this.orders];
  }

  getOne(orderId: string) {
    const order = this.orders.find((pizza) => pizza.id === parseInt(orderId));

    if (!order) {
      throw new NotFoundException(`The order with ${orderId} is not found`);
    }

    return { ...order };
  }
}
