import { Pizza } from "../types";

export const wait = (time: number) => new Promise((r) => setTimeout(r, time));

const toppingsUnits = (toppingsArray: string[]) => {
  const toppingsAtSameTime = 2;
  const timeUnit = toppingsArray.length / toppingsAtSameTime;
  return timeUnit;
};

const pizzaByStatus = (array: Pizza[], status: number) => {
  const foundPizza = array.find((pizza) => pizza.status === status);
  if (foundPizza) return foundPizza;
};

const ifPizzasByStatus = (array: Pizza[], status: number): boolean => {
  const pizzas = array.filter((pizza) => pizza.status === status);
  return pizzas.length > 0 ? true : false;
};

const trackTime = (pizza: Pizza) => {
  const lastIndex = pizza.timestamps.length - 1;
  const period = Math.round((Date.now() - pizza.timestamps[lastIndex]) / 1000);
  pizza.timestamps = [...pizza.timestamps, Date.now()];
  pizza.periods = [...pizza.periods, period];
};

export const doughChefDescriber = async (array: Pizza[]) => {
  while (ifPizzasByStatus(array, 0)) {
    const pizza = pizzaByStatus(array, 0);
    if (pizza !== undefined) {
      await wait(10);
      pizza.status = 1;
      await wait(7000);
      pizza.status = 2;
      trackTime(pizza);
      console.log(
        `pizza is ready for pizza ${array.indexOf(pizza)} -- took ${
          pizza.periods[1]
        }`
      );
    }
  }
};

export const toppingChefDescriber = async (array: Pizza[]) => {
  while (ifPizzasByStatus(array, 2)) {
    const pizza = pizzaByStatus(array, 2);
    if (pizza !== undefined) {
      await wait(10);
      pizza.status = 3;
      const toppingCoefficient = toppingsUnits(pizza.toppings);
      await wait(4000 * toppingCoefficient);
      pizza.status = 4;
      trackTime(pizza);
      console.log(
        `toppings are ready  ${array.indexOf(pizza)} -- took ${
          pizza.periods[2]
        }`
      );
    }
  }
};

export const ovenDecriber = async (array: Pizza[]) => {
  while (ifPizzasByStatus(array, 4)) {
    const pizza = pizzaByStatus(array, 4);
    if (pizza !== undefined) {
      await wait(10);
      pizza.status = 5;
      await wait(10000);
      pizza.status = 6;
      trackTime(pizza);
      console.log(
        `pizza is after the oven  ${array.indexOf(pizza)} -- took ${
          pizza.periods[3]
        }`
      );
    }
  }
};

export const waiterDescriber = async (array: Pizza[]) => {
  while (ifPizzasByStatus(array, 6)) {
    const pizza = pizzaByStatus(array, 6);
    if (pizza !== undefined) {
      await wait(10);
      pizza.status = 7;
      await wait(5000);
      pizza.status = 8;
      trackTime(pizza);
      console.log(
        `the proccess is ended  ${array.indexOf(pizza)} -- took ${
          pizza.periods[4]
        }`
      );
    }
  }
};
