import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';
import { RootState } from '../services/store';

export const fetchOrders = createAsyncThunk<TOrdersData>(
  'feed/fetchOrders',
  getFeedsApi
);

type TFeedState = {
  orders: TOrdersData | null;
};

const initialState: TFeedState = {
  orders: null
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
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
    });
  }
});

export const { resetOrders } = feedSlice.actions;
export const selectOrders = (state: RootState) => state.feed.orders; // Селектор

export default feedSlice.reducer;
