import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../services/store';

export const selectOrderByNumber = createSelector(
  [
    (state: RootState) => state.feed.orders?.orders || [],
    (state: RootState) => state.orders.orders,
    (_state: RootState, number: number) => number
  ],
  (feedOrders, profileOrders, number) =>
    feedOrders.find((order) => order.number === number) ||
    profileOrders.find((order) => order.number === number) ||
    null
);
