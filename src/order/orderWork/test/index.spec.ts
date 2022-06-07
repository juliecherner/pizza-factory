import { startOrder } from '../index';

jest.setTimeout(1000000);

describe('start order function', () => {
  it('returns right time for order', async () => {
    const toppings1 = [
      { toppings: ['1', '2', '3'] },
      { toppings: ['1', '2', '3'] },
    ];

    const toppings2 = [
      { toppings: ['1', '2'] },
      { toppings: ['1', '2', '3'] },
      { toppings: ['1', '2', '3', '4', '5'] },
    ];

    const order2 = await startOrder(toppings1);
    const order3 = await startOrder(toppings2);

    expect(order2.totalTime).toEqual(40);
    expect(order3.totalTime).toEqual(46);
  });

  it('returns right time for first pizza', async () => {
    const toppings2 = [
      { toppings: ['1', '2', '3'] },
      { toppings: ['1', '2', '3'] },
    ];

    const toppings3 = [
      { toppings: ['1', '2'] },
      { toppings: ['1', '2', '3'] },
      { toppings: ['1', '2', '3', '4', '5'] },
    ];

    const order2 = await startOrder(toppings2);
    const order3 = await startOrder(toppings3);

    const pizzaTime2 = order2.pizzas[0].time;
    const pizzaTime3 = order3.pizzas[0].time;

    expect(pizzaTime2).toEqual(30);
    expect(pizzaTime3).toEqual(26);
  });
});
