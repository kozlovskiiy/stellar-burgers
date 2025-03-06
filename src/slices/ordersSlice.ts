// import { orderBurgerApi, getOrdersApi } from '@api';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { TOrder } from '@utils-types';

// interface OrderState {
//   orderRequest: boolean;
//   orderModalData: TOrder | null;
//   orders: TOrder[]; // Добавим список заказов
// }

// const initialState: OrderState = {
//   orderRequest: false,
//   orderModalData: null,
//   orders: [] // Инициализируем пустым массивом
// };

// // Создаем асинхронный запрос для получения заказов
// export const fetchOrders = createAsyncThunk(
//   'orders/fetchOrders',
//   async () => await getOrdersApi() // Выполняем API запрос
// );

// const orderSlice = createSlice({
//   name: 'orders',
//   initialState,
//   reducers: {
//     closeOrderRequest(state) {
//       state.orderRequest = false;
//       state.orderModalData = null;
//     }
//   },
//   selectors: {
//     selectOrderRequest: (state) => state.orderRequest,
//     selectOrderModalData: (state) => state.orderModalData,
//     selectOrders: (state) => state.orders // Селектор для получения всех заказов
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNewOrder.pending, (state) => {
//         state.orderRequest = true;
//       })
//       .addCase(fetchNewOrder.rejected, (state) => {
//         state.orderRequest = false;
//       })
//       .addCase(fetchNewOrder.fulfilled, (state, action) => {
//         state.orderModalData = action.payload.order;
//         state.orderRequest = false;
//       })
//       .addCase(fetchOrders.pending, (state) => {
//         state.orderRequest = true;
//       })
//       .addCase(fetchOrders.rejected, (state) => {
//         state.orderRequest = false;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.orders = action.payload; // Заполняем список заказов
//         state.orderRequest = false;
//       });
//   }
// });

// export const fetchNewOrder = createAsyncThunk(
//   'orders/newOrder',
//   async (data: string[]) => orderBurgerApi(data)
// );

// export const { closeOrderRequest } = orderSlice.actions;
// export const { selectOrderRequest, selectOrderModalData, selectOrders } =
//   orderSlice.selectors;
// export default orderSlice.reducer;

import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: TOrder[]; // Добавим список заказов,
  selectedOrder: TOrder | null;
}

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  orders: [], // Инициализируем пустым массивом,
  selectedOrder: null
};

// Создаем асинхронный запрос для получения заказов
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => await getOrdersApi() // Выполняем API запрос
);

// Экшен для получения заказа по номеру
export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (orderNumber: number) =>
    // Здесь твой API запрос для получения заказа по номеру
    await getOrderByNumberApi(orderNumber)
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeOrderRequest(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData,
    selectOrders: (state) => state.orders // Селектор для получения всех заказов
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload; // Заполняем список заказов
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
        state.orderRequest = false;
      });
  }
});

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const { closeOrderRequest } = orderSlice.actions;
export const { selectOrderRequest, selectOrderModalData, selectOrders } =
  orderSlice.selectors;
export default orderSlice.reducer;
