import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, Topping } from './order.model';
import { startOrder } from './orderWork/index';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  private readonly orders = [];

  constructor(
    @InjectModel('Order') private readonly productModel: Model<Order>,
  ) {}

  async addOrder(toppings: Topping[]): Promise<Order> {
    const processedOrder = await startOrder(toppings);
    const newOrder = new this.productModel(processedOrder).save();

    if (!newOrder) {
      throw new NotFoundException('The order is not created');
    }

    return newOrder;
  }

  async getAll(): Promise<Order[]> {
    const allOrders = await this.productModel.find().exec();
    return allOrders;
  }

  getOne(orderId: string) {
    const order = this.productModel.findById(orderId);

    if (!order) {
      throw new NotFoundException(`The order with ${orderId} is not found`);
    }
    return order;
  }
}
