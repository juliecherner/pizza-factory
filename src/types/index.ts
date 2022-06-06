export type Pizza = {
  id?: number;
  status: number;
  toppings: string[];
  time: number;
};

export type PizzaInitial = Pick<Pizza, "toppings">;
