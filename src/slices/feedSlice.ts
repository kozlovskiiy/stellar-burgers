import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';
import { RootState } from '../services/store'; // Путь уточни под свой проект

export const fetchOrders = createAsyncThunk<TOrdersData>(
  'feed/fetchOrders',
  async () => {
    const data = await getFeedsApi();
    return data;
  }
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
    });
  }
});

export const selectOrders = (state: RootState) => state.feed.orders; // Селектор

export default feedSlice.reducer;
