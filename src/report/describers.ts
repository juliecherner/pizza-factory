import { Pizza } from "../types";

export const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const toppingsUnits = (toppingsArray: string[]) => {
  const toppingsAtSameTime = 2;
  const timeUnit = toppingsArray.length / toppingsAtSameTime;
  return timeUnit;
};

export const pizzaByStatus = (array: Pizza[], status: number) => {
  const foundPizza = array.find((pizza) => pizza.status === status);
  if (foundPizza) return foundPizza;
};

const ifExistNotReadyPizzas = (array: Pizza[], status: number) => {
  const pizzas = array.filter((pizza) => pizza.status <= status);
  return pizzas.length > 0 ? true : false;
};

const trackTime = (pizza: Pizza) => {
  const time = Math.round((Date.now() - pizza.timestamps[0]) / 1000);
  pizza.seconds = time;
  pizza.timestamps = [...pizza.timestamps, Date.now()];
};

export const doughChefDescriber = async (name: string, array: Pizza[]) => {
  while (ifExistNotReadyPizzas(array, 0)) {
    const pizza = pizzaByStatus(array, 0);
    if (pizza !== undefined) {
      pizza.status = 1;
      await wait(7000);
      pizza.status = 2;
      trackTime(pizza);
      console.log(`pizza ${pizza.id}  chef ${name}`);
    }
  }
};

export const toppingChefDescriber = async (array: Pizza[]) => {
  while (ifExistNotReadyPizzas(array, 2)) {
    const pizza = pizzaByStatus(array, 2);
    if (pizza !== undefined) {
      pizza.status = 3;
      const toppingCoefficient = toppingsUnits(pizza.toppings);
      await wait(4000 * toppingCoefficient);
      pizza.status = 4;
      trackTime(pizza);
    }
  }
};

export const ovenDecriber = async (array: Pizza[]) => {
  while (ifExistNotReadyPizzas(array, 4)) {
    const pizza = pizzaByStatus(array, 4);
    if (pizza !== undefined) {
      pizza.status = 5;
      await wait(10000);
      pizza.status = 6;
      trackTime(pizza);
      console.log(
        `pizza is after the oven  ${array.indexOf(pizza)} -- took ${
          pizza.seconds
        }`
      );
    }
  }
};

export const waiterDescriber = async (array: Pizza[]) => {
  while (ifExistNotReadyPizzas(array, 6)) {
    const pizza = pizzaByStatus(array, 6);
    if (pizza !== undefined) {
      pizza.status = 7;
      await wait(5000);
      pizza.status = 8;
      trackTime(pizza);
      console.log(
        `the proccess is ended  ${array.indexOf(pizza)} -- took ${
          pizza.seconds
        }`
      );
    }
  }
};
