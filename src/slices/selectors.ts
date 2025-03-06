import { createSelector } from '../services/store';

export const selectOrderByNumber = createSelector(
  [
    (state) => state.feed.orders?.orders || [],
    (state) => state.orders.orders,
    (_, number: number) => number
  ],
  (feedOrders, profileOrders, number) =>
    feedOrders.find((order) => order.number === number) ||
    profileOrders.find((order) => order.number === number) ||
    null
);
