import {
  doughChefDescriber,
  toppingChefDescriber,
  ovenDecriber,
  waiterDescriber,
} from "./describers";
import { wait } from "./describers";
import { Pizza } from "../types";

const doughChefWork = async (array: Pizza[]) => {
  const promises = [];

  for (let i = 0; i < 2; i++) {
    promises.push(doughChefDescriber(array));
    await wait(50);
    console.log(array);
  }
  await Promise.all(promises);
};

const toppingChefWork = async (array: Pizza[]) => {
  const promises = [];

  for (let i = 0; i < 4; i++) {
    promises.push(toppingChefDescriber(array));
    await wait(50);
    console.log(array);
  }

  await Promise.all(promises);
};

const ovenWork = async (array: Pizza[]) => {
  await ovenDecriber(array);
  await wait(50);
};

const waiterWork = async (array: Pizza[]) => {
  const promises = [];

  for (let i = 0; i < 2; i++) {
    promises.push(waiterDescriber(array));
    await wait(50);
  }

  await Promise.all(promises);
};

export const work = async (array: Pizza[]) => {
  await doughChefWork(array);
  await toppingChefWork(array);
  await ovenWork(array);
  await waiterWork(array);
};
