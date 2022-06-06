import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Topping, Order } from './order.model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async addOrder(@Body() toppings: Topping[]) {
    const completedOrder = await this.orderService.addOrder(toppings);
    console.log('result from controller', completedOrder);
    return completedOrder;
  }

  @Get()
  getAll() {
    return this.orderService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') orderId: string) {
    return this.orderService.getOne(orderId);
  }
}
