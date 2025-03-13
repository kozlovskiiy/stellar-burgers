// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getFeedsApi } from '@api';
// import { TOrdersData } from '@utils-types';
// import { RootState } from '../services/store';

// export const fetchOrders = createAsyncThunk<TOrdersData>(
//   'feed/fetchOrders',
//   getFeedsApi
// );

// type TFeedState = {
//   orders: TOrdersData | null;
// };

// export const initialState: TFeedState = {
//   orders: null
// };

// const feedSlice = createSlice({
//   name: 'feed',
//   initialState,
//   reducers: {
//     resetOrders: (state) => {
//       state.orders = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
//       state.orders = payload;
//     });
//   }
// });

// export const { resetOrders } = feedSlice.actions;
// export const selectOrders = (state: RootState) => state.feed.orders; // Селектор

// export default feedSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';
import { RootState } from '../services/store';

export const fetchOrders = createAsyncThunk<TOrdersData>(
  'feed/fetchOrders',
  getFeedsApi
);

export type TFeedState = {
  orders: TOrdersData | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TFeedState = {
  orders: null,
  isLoading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orders = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при обнолении ленты заказов';
      });
  }
});

export const { resetOrders } = feedSlice.actions;

export const selectOrders = (state: RootState) => state.feed.orders;

export default feedSlice.reducer;
