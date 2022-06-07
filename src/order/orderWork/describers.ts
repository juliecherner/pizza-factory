import { PizzaInWork } from './workTypes';

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

export const pizzaByStatus = (array: PizzaInWork[], status: number) => {
  const foundPizza = array.find((pizza) => pizza.status === status);
  if (foundPizza) return foundPizza;
};

const ifExistPizzasForDescriber = (array: PizzaInWork[], status: number) => {
  const pizzas = array.filter((pizza) => pizza.status <= status);
  return pizzas.length > 0 ? true : false;
};

const trackTime = (pizza: PizzaInWork) => {
  const lastIndex = pizza.timestamps.length - 1;
  pizza.time = Math.round((Date.now() - pizza.timestamps[lastIndex]) / 1000);
  pizza.timestamps = [...pizza.timestamps, Date.now()];
};

const getStartEndTime = (pizza: PizzaInWork) => {
  const lastIndex = pizza.timestamps.length - 1;
  const startTime = pizza.timestamps[lastIndex - 1];
  const endTime = pizza.timestamps[lastIndex];
  return `start: ${convertTimeStampToTime(
    startTime,
  )}, end: ${convertTimeStampToTime(endTime)}, total time: ${pizza.time}`;
};

const convertTimeStampToTime = (timestamp: number) => {
  const time = new Date(timestamp).toLocaleTimeString('en-US');
  return time;
};

const logProcesses = (
  stageName: string,
  array: PizzaInWork[],
  pizza: PizzaInWork,
) => {
  console.log(
    `pizza ${array.indexOf(pizza)} | ${stageName} | ${getStartEndTime(pizza)}`,
  );
};

export const doughChefDescriber = async (array: PizzaInWork[]) => {
  while (ifExistPizzasForDescriber(array, 0)) {
    const pizza = pizzaByStatus(array, 0);
    if (pizza !== undefined) {
      pizza.status = process.atDoughChef.stage;
      trackTime(pizza);
      logProcesses('waiting for dough chef', array, pizza);
      await wait(process.atDoughChef.time);
      pizza.status = process.waitingForToppingChef.stage;
      trackTime(pizza);
      logProcesses('dough is ready', array, pizza);
    }
  }
};

export const toppingChefDescriber = async (array: PizzaInWork[]) => {
  while (ifExistPizzasForDescriber(array, 2)) {
    const pizza = pizzaByStatus(array, 2);
    if (pizza !== undefined) {
      pizza.status = process.atToppingChef.stage;
      trackTime(pizza);
      logProcesses('waiting for topping chef', array, pizza);
      await wait(toppingsTotalTime(pizza.toppings));
      pizza.status = process.waitingForOven.stage;
      trackTime(pizza);
      logProcesses('toppings are added', array, pizza);
    } else {
      await wait(50);
      await toppingChefDescriber(array);
    }
  }
};

export const ovenDecriber = async (array: PizzaInWork[]) => {
  while (ifExistPizzasForDescriber(array, 4)) {
    const pizza = pizzaByStatus(array, 4);
    if (pizza !== undefined) {
      pizza.status = process.inOven.stage;
      trackTime(pizza);
      logProcesses('waiting for oven', array, pizza);
      await wait(process.inOven.time);
      pizza.status = process.waitingForWaiter.stage;
      trackTime(pizza);
      logProcesses('pizza is baked', array, pizza);
    } else {
      await wait(50);
      await ovenDecriber(array);
    }
  }
};

export const waiterDescriber = async (array: PizzaInWork[]) => {
  while (ifExistPizzasForDescriber(array, 6)) {
    const pizza = pizzaByStatus(array, 6);
    if (pizza !== undefined) {
      pizza.status = process.atWaiter.stage;
      trackTime(pizza);
      logProcesses('waiting for waiter', array, pizza);
      await wait(process.atWaiter.time);
      pizza.status = process.end.stage;
      trackTime(pizza);
      logProcesses('pizza is served', array, pizza);
    } else {
      await wait(50);
      await waiterDescriber(array);
    }
  }
};
