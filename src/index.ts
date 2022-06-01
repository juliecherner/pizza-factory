import { work } from "./report/work";

import { Pizza, PizzaInitial } from "./types";

const pizzaOrder: PizzaInitial[] = [
  {
    toppings: ["i", "n", "n"],
  },
  {
    toppings: ["i", "o", "n", "n", "o"],
  },
  { toppings: ["n"] },
];

let pizzaWithStatus: Pizza[] = pizzaOrder.map(
  (pizza: Pizza | PizzaInitial) =>
    (pizza = { ...pizza, status: 0, timestamps: [Date.now()], periods: [0] })
);

console.log(`Pizza with status`, pizzaWithStatus);

// const steps = {
//   0: { text: "order accepted and waiting for chef 1" },
//   1: { text: "at chef 1", time: 7 },
//   2: "waiting for chef 2",
//   3: { text: "at chef 2", time: 4 },
//   4: "waiting for oven",
//   5: { text: "in oven", time: 10 },
//   6: "waiting for waiter",
//   7: { text: "at waiter", time: 5 },
//   8: { text: "end" },
// };

const main = async () => {
  await work(pizzaWithStatus);
  console.log(pizzaWithStatus);
};

main();
