import {
  doughChefDescriber,
  toppingChefDescriber,
  ovenDecriber,
  waiterDescriber,
} from './describers';
import { wait } from './describers';
import { PizzaInWork } from './workTypes';

const decribersAmount = {
  dough: 2,
  topping: 3,
  oven: 1,
  waiters: 2,
};

const doughChefWork = async (array: PizzaInWork[]) => {
  const promises = [];

  for (let i = 0; i < decribersAmount.dough; i++) {
    promises.push(doughChefDescriber(array));
    await wait(50);
  }
  await Promise.all(promises);
};

const toppingChefWork = async (array: PizzaInWork[]) => {
  const promises = [];

  for (let i = 0; i < decribersAmount.topping; i++) {
    promises.push(toppingChefDescriber(array));
    await wait(50);
  }

  await Promise.all(promises);
};

const ovenWork = async (array: PizzaInWork[]) => {
  const promises = [];

  for (let i = 0; i < decribersAmount.oven; i++) {
    promises.push(ovenDecriber(array));
    await wait(50);
  }
};

const waiterWork = async (array: PizzaInWork[]) => {
  const promises = [];

  for (let i = 0; i < decribersAmount.waiters; i++) {
    promises.push(waiterDescriber(array));
    await wait(50);
  }

  await Promise.all(promises);
};

export const work = async (array: PizzaInWork[]) => {
  const promises = [
    doughChefWork(array),
    toppingChefWork(array),
    ovenWork(array),
    waiterWork(array),
  ];

  await Promise.all(promises);
};
