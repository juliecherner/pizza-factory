export type Pizza = {
  status: number;
  toppings: string[];
  timestamps: number[];
  periods: number[];
};

export type PizzaInitial = Pick<Pizza, "toppings">;
