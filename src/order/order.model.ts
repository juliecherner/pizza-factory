export class Order {
  constructor(
    public id: number,
    public totalTime: number,
    public pizzas: Pizza[],
  ) {
    // this.id = id;
    // this.status = status;
    // this.toppings = toppings;
    // this.time = time;
  }
}

export type Pizza = {
  id: number;
  toppings: string[];
  time: number;
  status: number;
};

export type Topping = {
  toppings: string[];
};
