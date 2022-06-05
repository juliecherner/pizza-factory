import {
  doughChefDescriber,
  toppingChefDescriber,
  ovenDecriber,
  waiterDescriber,
} from "./describers";
import { wait } from "./describers";
import { Pizza } from "../types";

const doughChefWork = async (array: Pizza[]) => {
  let promises = [];

  for (let i = 0; i < 2; i++) {
    promises.push(doughChefDescriber(i.toString(), array));
    await wait(50);
    console.log(array);
  }
  await Promise.all(promises);
};

const toppingChefWork = async (array: Pizza[]) => {
  let promises = [];

  for (let i = 0; i < 4; i++) {
    promises.push(toppingChefDescriber(array));
    await wait(50);
  }

  await Promise.all(promises);
};

const ovenWork = async (array: Pizza[]) => {
  await ovenDecriber(array);
  await wait(50);
};

const waiterWork = async (array: Pizza[]) => {
  let promises = [];

  for (let i = 0; i < 2; i++) {
    promises.push(waiterDescriber(array));
    await wait(50);
  }

  await Promise.all(promises);
};

export const work = async (array: Pizza[]) => {
  let promises = [
    doughChefWork(array),
    //toppingChefWork(array),
    //ovenWork(array),
    //waiterWork(array),
  ];

  await Promise.all(promises);
};
