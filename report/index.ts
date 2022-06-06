import { work } from './work';
import { Pizza, PizzaInitial } from '../types/index';

const pizzaOrder: PizzaInitial[] = [
  {
    toppings: ['i', 'n', 'n'],
  },
  { toppings: ['n'] },
  { toppings: ['n', 'n', 'n'] },
];

const pizzaWithStatus: Pizza[] = pizzaOrder.map(
  (pizza: Pizza | PizzaInitial) =>
    (pizza = { ...pizza, status: 0, time: Date.now() }),
);

const getReport = (pizzaWithStatus: Pizza[]) => {
  const timeArray = pizzaWithStatus.map((pizza) => pizza.time);
  const maxTime = Math.max(...timeArray);
  console.log({ orderTime: maxTime, pizzasTime: pizzaWithStatus });
  return { orderTime: maxTime, pizzasTime: pizzaWithStatus };
};

const main = async () => {
  await work(pizzaWithStatus);
  getReport(pizzaWithStatus);
};

main();
