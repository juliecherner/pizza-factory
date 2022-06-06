import {
  doughChefDescriber,
  toppingChefDescriber,
  ovenDecriber,
  waiterDescriber,
} from './describers';
import { wait } from './describers';
import { Pizza } from '../types';

const workersAmount = {
  dough: 2,
  topping: 3,
  oven: 1,
  waiters: 2,
};

const doughChefWork = async (array: Pizza[]) => {
  const promises = [];

  for (let i = 0; i < workersAmount.dough; i++) {
    promises.push(doughChefDescriber(array));
    await wait(50);
  }
  await Promise.all(promises);
};

const toppingChefWork = async (array: Pizza[]) => {
  const promises = [];

  for (let i = 0; i < workersAmount.topping; i++) {
    promises.push(toppingChefDescriber(array));
    await wait(50);
  }

  await Promise.all(promises);
};

const ovenWork = async (array: Pizza[]) => {
  const promises = [];

  for (let i = 0; i < workersAmount.oven; i++) {
    promises.push(ovenDecriber(array));
    await wait(50);
  }
};

const waiterWork = async (array: Pizza[]) => {
  const promises = [];

  for (let i = 0; i < workersAmount.waiters; i++) {
    promises.push(waiterDescriber(array));
    await wait(50);
  }

  await Promise.all(promises);
};

export const work = async (array: Pizza[]) => {
  const promises = [
    doughChefWork(array),
    toppingChefWork(array),
    ovenWork(array),
    waiterWork(array),
  ];

  await Promise.all(promises);
};
