export class Order {
  constructor(
    public id: number,
    public totalTime: number,
    public pizzas: Pizza[],
  ) {}
}

export type Pizza = {
  toppings: string[];
  time: number;
};

export type Topping = Pick<Pizza, 'toppings'>;
