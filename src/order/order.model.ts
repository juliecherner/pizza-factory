import * as mongoose from 'mongoose';

export type Order = {
  _id?: string;
  totalTime: number;
  pizzas: Pizza[];
};

export interface Pizza {
  _id?: string;
  toppings: string[];
  time: number;
}

export type Topping = Pick<Pizza, 'toppings'>;

export const OrderSchema = new mongoose.Schema({
  totalTime: { type: Number, required: true },
  pizzas: [
    {
      toppings: [{ type: String, required: true }],
      time: { type: Number, required: true },
    },
  ],
});
