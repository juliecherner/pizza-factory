import { work } from './work';
import { Topping, Order } from '../order.model';
import { OrderInWork } from './workTypes';

export const setOrder = (toppingArray: Topping[]): OrderInWork => {
  const id = Date.now();
  const startTime = Date.now();
  const pizzaId = Date.now();
  const pizzas = toppingArray.map((pizza) => ({
    id: pizzaId,
    status: 0,
    time: 0,
    timestamps: [startTime],
    ...pizza,
  }));

  return { id: id, totalTime: 0, pizzas };
};

const getOrderReport = (order: OrderInWork): Order => {
  const timeArray = [];

  const orderReport = {
    id: order.id,
    totalTime: 0,
    pizzas: [],
  };

  for (const pizza of order.pizzas) {
    const timestamps = pizza.timestamps;
    const pizzaTime =
      (timestamps[timestamps.length - 1] - timestamps[0]) / 1000;
    pizza.time = Math.round(pizzaTime);
    timeArray.push(pizza.time);
    orderReport.pizzas.push({
      time: pizza.time,
      toppings: pizza.toppings,
    });
  }

  orderReport.totalTime = Math.round(Math.max(...timeArray));

  return orderReport;
};

export const startOrder = async (toppingArray: Topping[]): Promise<Order> => {
  const order = setOrder(toppingArray);
  await work(order.pizzas);

  return getOrderReport(order);
};
