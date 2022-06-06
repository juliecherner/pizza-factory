import { Pizza } from "../types";

const process = {
  gotOrder: { stage: 0 },
  atDoughChef: { stage: 1, time: 7000 },
  waitingForToppingChef: { stage: 2 },
  atToppingChef: { stage: 3, time: 4000, toppingsAtSameTime: 2 },
  waitingForOven: { stage: 4 },
  inOven: { stage: 5, time: 10000 },
  waitingForWaiter: { stage: 6 },
  atWaiter: { stage: 7, time: 5000 },
  end: { stage: 8 },
};

export const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const toppingsTotalTime = (toppingsArray: string[]) => {
  const totalTime =
    (toppingsArray.length / process.atToppingChef.toppingsAtSameTime) *
    process.atToppingChef.time;
  return totalTime;
};

export const pizzaByStatus = (array: Pizza[], status: number) => {
  const foundPizza = array.find((pizza) => pizza.status === status);
  if (foundPizza) return foundPizza;
};

const ifExistPizzasForDescriber = (array: Pizza[], status: number) => {
  const pizzas = array.filter((pizza) => pizza.status <= status);
  return pizzas.length > 0 ? true : false;
};

const trackTime = (pizza: Pizza) => {
  const seconds = Math.round((Date.now() - pizza.time) / 1000);
  pizza.time = seconds;
};

export const doughChefDescriber = async (array: Pizza[]) => {
  while (ifExistPizzasForDescriber(array, 0)) {
    const pizza = pizzaByStatus(array, 0);
    if (pizza !== undefined) {
      pizza.status = process.atDoughChef.stage;
      await wait(process.atDoughChef.time);
      pizza.status = process.waitingForToppingChef.stage;
    }
  }
};

export const toppingChefDescriber = async (array: Pizza[]) => {
  while (ifExistPizzasForDescriber(array, 2)) {
    const pizza = pizzaByStatus(array, 2);
    if (pizza !== undefined) {
      pizza.status = process.atToppingChef.stage;
      await wait(toppingsTotalTime(pizza.toppings));
      pizza.status = process.waitingForOven.stage;
    } else {
      await wait(50);
      await toppingChefDescriber(array);
    }
  }
};

export const ovenDecriber = async (array: Pizza[]) => {
  while (ifExistPizzasForDescriber(array, 4)) {
    const pizza = pizzaByStatus(array, 4);
    if (pizza !== undefined) {
      pizza.status = process.inOven.stage;
      await wait(process.inOven.time);
      pizza.status = process.waitingForWaiter.stage;
    } else {
      await wait(50);
      await ovenDecriber(array);
    }
  }
};

export const waiterDescriber = async (array: Pizza[]) => {
  while (ifExistPizzasForDescriber(array, 6)) {
    const pizza = pizzaByStatus(array, 6);
    if (pizza !== undefined) {
      pizza.status = process.atWaiter.stage;
      await wait(process.atWaiter.time);
      pizza.status = process.end.stage;
      trackTime(pizza);
    } else {
      await wait(50);
      await waiterDescriber(array);
    }
  }
};
