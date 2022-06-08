import { Pizza } from '../order.model';

export interface PizzaInWork extends Pizza {
  status: number;
  timestamps: number[];
}

export type OrderInWork = {
  totalTime: number;
  pizzas: PizzaInWork[];
};
