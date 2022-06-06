import { work } from './work';
import { Order, Pizza } from '../order.model';

import { Topping } from '../order.model';

export const setOrder = (toppingArray: Topping[]) => {
  const id = Date.now();
  const startTime = Date.now();
  const pizzaId = Date.now();
  const pizzas = toppingArray.map((pizza) => ({
    id: pizzaId,
    status: 0,
    time: startTime,
    ...pizza,
  }));

  return { id: id, totalTime: startTime, pizzas };
};

const findOrderTime = (pizzas: Pizza[]) => {
  const timeArray = pizzas.map((pizza) => pizza.time);
  return Math.max(...timeArray);
};

export const startOrder = async (toppingArray: Topping[]) => {
  const order = setOrder(toppingArray);
  await work(order.pizzas);
  const orderTime = findOrderTime(order.pizzas);
  order.totalTime = orderTime;

  return order;
};
