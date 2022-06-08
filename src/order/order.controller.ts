import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Topping, Order } from './order.model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async addOrder(@Body() toppings: Topping[]): Promise<Order> {
    const completedOrder = await this.orderService.addOrder(toppings);
    console.log('order report is logged', completedOrder);
    return completedOrder;
  }

  @Get()
  async getAll(): Promise<Order[]> {
    return await this.orderService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') orderId: string): Promise<Order> {
    return await this.orderService.getOne(orderId);
  }
}
