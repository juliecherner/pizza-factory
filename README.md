# Pizza Kitchen Project

## Problem

Task: organize pizza production for the restaurant
Aims:

- log report which includes total time of order execution and total time for each pizza

- log start and end time for each process

Process flow: dough chef -> topping chef -> oven -> waiter

Stations of production: dough chef (2), topping chef(3), oven(1), waiter (2)
Amount of time for each station: dough chef (7 seconds), topping chef (4 seconds - includes 2 toppings, finishes the pizza he started), oven (10 seconds), waiter (5 seconds),

Condition: all processes should run at the same time

Decision: running processes in parallel by mutating the order and adding new qualities to initial order (for calculations and logs)

- defining 8 stages that 1 pizza passes before being served and adding time (milliseconds).

```ts
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
```

- creating describers that describe the logic how each station functionates

- creating workers for each station considering their amounts and awaiting them with Promise.all

- getting total execution time for order and each pizza in it and taking only nessesary data for final processed order (report format)

## Technologies

- Typescript
- Nest.js
- Jest
- MongoDB
- Docker

## Init

```bash
cp .env.default .env
docker-compose up -d
```

## Input JSON example for POST request

```bash
[
    { "toppings" : ["1", "2", "3"] },
    { "toppings" : ["1"]},
    { "toppings" : ["1", "2", "3"] },
    { "toppings" : ["1", "2", "3"] }
]
```

## Expected outputs example in console

Logged final report

```bash
order report is logged {
  totalTime: 56,
  pizzas: [
    {
      toppings: [Array],
      time: 36,
      _id: new ObjectId("62a47f194a9a764424285126")
    },
    {
      toppings: [Array],
      time: 26,
      _id: new ObjectId("62a47f194a9a764424285127")
    },
    {
      toppings: [Array],
      time: 46,
      _id: new ObjectId("62a47f194a9a764424285128")
    },
    {
      toppings: [Array],
      time: 56,
      _id: new ObjectId("62a47f194a9a764424285129")
    }
  ],
  _id: new ObjectId("62a47f194a9a764424285125"),
  __v: 0
}

```

Logged start and end time for each process

```bash
pizza 0 | waiting for dough chef | start: 3:34:22 PM, end: 3:34:22 PM, total time: 0
pizza 1 | waiting for dough chef | start: 3:34:22 PM, end: 3:34:22 PM, total time: 0
pizza 0 | dough is ready | start: 3:34:22 PM, end: 3:34:29 PM, total time: 7
pizza 2 | waiting for dough chef | start: 3:34:22 PM, end: 3:34:29 PM, total time: 7
pizza 0 | waiting for topping chef | start: 3:34:29 PM, end: 3:34:29 PM, total time: 0
pizza 1 | dough is ready | start: 3:34:22 PM, end: 3:34:29 PM, total time: 7
pizza 3 | waiting for dough chef | start: 3:34:22 PM, end: 3:34:29 PM, total time: 7
pizza 1 | waiting for topping chef | start: 3:34:29 PM, end: 3:34:29 PM, total time: 0
pizza 1 | toppings are added | start: 3:34:29 PM, end: 3:34:31 PM, total time: 2
pizza 1 | waiting for oven | start: 3:34:31 PM, end: 3:34:31 PM, total time: 0
pizza 0 | toppings are added | start: 3:34:29 PM, end: 3:34:35 PM, total time: 6
pizza 2 | dough is ready | start: 3:34:29 PM, end: 3:34:36 PM, total time: 7
pizza 2 | waiting for topping chef | start: 3:34:36 PM, end: 3:34:36 PM, total time: 0
pizza 3 | dough is ready | start: 3:34:29 PM, end: 3:34:36 PM, total time: 7
pizza 3 | waiting for topping chef | start: 3:34:36 PM, end: 3:34:36 PM, total time: 0
pizza 1 | pizza is baked | start: 3:34:31 PM, end: 3:34:41 PM, total time: 10
pizza 0 | waiting for oven | start: 3:34:35 PM, end: 3:34:41 PM, total time: 6
pizza 1 | waiting for waiter | start: 3:34:41 PM, end: 3:34:41 PM, total time: 0
pizza 2 | toppings are added | start: 3:34:36 PM, end: 3:34:42 PM, total time: 6
pizza 3 | toppings are added | start: 3:34:36 PM, end: 3:34:42 PM, total time: 6
pizza 1 | pizza is served | start: 3:34:41 PM, end: 3:34:46 PM, total time: 5
pizza 0 | pizza is baked | start: 3:34:41 PM, end: 3:34:51 PM, total time: 10
pizza 2 | waiting for oven | start: 3:34:42 PM, end: 3:34:51 PM, total time: 9
pizza 0 | waiting for waiter | start: 3:34:51 PM, end: 3:34:51 PM, total time: 0
pizza 0 | pizza is served | start: 3:34:51 PM, end: 3:34:56 PM, total time: 5
pizza 2 | pizza is baked | start: 3:34:51 PM, end: 3:35:01 PM, total time: 10
pizza 3 | waiting for oven | start: 3:34:42 PM, end: 3:35:01 PM, total time: 19
pizza 2 | waiting for waiter | start: 3:35:01 PM, end: 3:35:01 PM, total time: 0
pizza 2 | pizza is served | start: 3:35:01 PM, end: 3:35:06 PM, total time: 5
pizza 3 | pizza is baked | start: 3:35:01 PM, end: 3:35:11 PM, total time: 10
pizza 3 | waiting for waiter | start: 3:35:11 PM, end: 3:35:11 PM, total time: 0
pizza 3 | pizza is served | start: 3:35:11 PM, end: 3:35:16 PM, total time: 5
```
