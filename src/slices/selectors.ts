import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../services/store';
export const selectOrdersForPage = createSelector(
  [
    (state: RootState, source: 'feed' | 'profile') => source,
    (state: RootState) => state.feed.orders,
    (state: RootState) => state.orders.orders
  ],
  (source, feedOrders, profileOrders) => {
    if (source === 'feed') {
      console.log(feedOrders);
      return feedOrders?.orders || [];
    } else {
      console.log(profileOrders);
      return profileOrders;
    }
  }
);
