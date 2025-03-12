import orderReducer, {
  fetchOrders,
  fetchOrderByNumber,
  fetchNewOrder,
  closeOrderRequest,
  initialState
} from '../ordersSlice'; // Путь к слайсу

describe('orderSlice', () => {
  test('вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером', () => {
    const state = orderReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  test('обработка загрузки fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.orders).toEqual([]);
  });

  test('обработка успешного выполнения fetchOrders.fulfilled', () => {
    const ordersMock = [
      {
        _id: 'order1',
        name: 'Order 1',
        status: 'done',
        ingredients: ['ingredient1', 'ingredient2'],
        price: 300
      },
      {
        _id: 'order2',
        name: 'Order 2',
        status: 'in-progress',
        ingredients: ['ingredient3', 'ingredient4'],
        price: 400
      }
    ];

    const action = {
      type: fetchOrders.fulfilled.type,
      payload: ordersMock
    };

    const state = orderReducer(initialState, action);
    expect(state.orders).toEqual(ordersMock);
    expect(state.orderRequest).toBe(false);
  });

  test('обработка ошибки fetchOrders.rejected', () => {
    const action = {
      type: fetchOrders.rejected.type,
      error: { message: 'Ошибка при загрузке заказов' }
    };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orders).toEqual([]);
  });

  test('обработка загрузки fetchOrderByNumber.pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.selectedOrder).toBeNull();
  });

  test('обработка успешного выполнения fetchOrderByNumber.fulfilled', () => {
    const selectedOrderMock = {
      _id: 'order1',
      name: 'Order 1',
      status: 'done',
      ingredients: ['ingredient1', 'ingredient2'],
      price: 300
    };

    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: { orders: [selectedOrderMock] }
    };

    const state = orderReducer(initialState, action);
    expect(state.selectedOrder).toEqual(selectedOrderMock);
    expect(state.orderRequest).toBe(false);
  });

  test('обработка ошибки fetchOrderByNumber.rejected', () => {
    const action = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: 'Ошибка при получении заказа' }
    };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.selectedOrder).toBeNull();
  });

  test('обработка загрузки fetchNewOrder.pending', () => {
    const action = { type: fetchNewOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
  });

  test('обработка успешного выполнения fetchNewOrder.fulfilled', () => {
    const newOrderMock = {
      _id: 'newOrder',
      name: 'New Order',
      status: 'done',
      ingredients: ['ingredient1', 'ingredient2'],
      price: 300
    };

    const action = {
      type: fetchNewOrder.fulfilled.type,
      payload: { order: newOrderMock }
    };

    const state = orderReducer(initialState, action);
    expect(state.orderModalData).toEqual(newOrderMock);
    expect(state.orderRequest).toBe(false);
  });

  test('обработка ошибки fetchNewOrder.rejected', () => {
    const action = {
      type: fetchNewOrder.rejected.type,
      error: { message: 'Ошибка при создании заказа' }
    };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBeNull();
  });

  test('проверка редьюсера closeOrderRequest', () => {
    const action = closeOrderRequest();
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBeNull();
  });
});