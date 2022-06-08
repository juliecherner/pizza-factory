import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order, Topping } from './order.model';
import { startOrder } from './orderWork/index';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly productModel: Model<Order>,
  ) {}

  async addOrder(toppings: Topping[]): Promise<Order> {
    const processedOrder = await startOrder(toppings);
    const newOrder = new this.productModel(processedOrder).save();

    if (!newOrder) {
      throw new BadRequestException();
    }

    return newOrder;
  }

  async getAll(): Promise<Order[]> {
    const allOrders = await this.productModel.find().exec();

    return allOrders;
  }

  async getOne(orderId: string) {
    const order = await this.productModel.findById(orderId).exec();

    if (!order) {
      throw new NotFoundException();
    }

    return order;
  }
}
