import userReducer, {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk,
  getOrdersThunk,
  clearErrors,
  initialState
} from '../userSlice'; // Путь к слайсу

describe('userSlice', () => {
  test('вызов слайса с неопределенным состоянием', () => {
    const state = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  test('обработка загрузки loginUserThunk.pending', () => {
    const action = { type: loginUserThunk.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('обработка успешного выполнения loginUserThunk.fulfilled', () => {
    const userMock = {
      _id: 'user1',
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: userMock
    };

    const state = userReducer(initialState, action);
    expect(state.user).toEqual(userMock);
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(true);
  });

  test('обработка ошибки loginUserThunk.rejected', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      error: { message: 'Ошибка авторизации' }
    };

    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(false);
    expect(state.error).toBe('Ошибка авторизации');
  });

  test('обработка загрузки registerUserThunk.pending', () => {
    const action = { type: registerUserThunk.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(true);
    expect(state.isAuthenticated).toBe(false);
  });

  test('обработка успешного выполнения registerUserThunk.fulfilled', () => {
    const userMock = {
      _id: 'user2',
      name: 'Jane Doe',
      email: 'jane.doe@example.com'
    };

    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: userMock
    };

    const state = userReducer(initialState, action);
    expect(state.user).toEqual(userMock);
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(true);
  });

  test('обработка ошибки registerUserThunk.rejected', () => {
    const action = {
      type: registerUserThunk.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };

    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
  });

  test('обработка загрузки logoutUserThunk.pending', () => {
    const action = { type: logoutUserThunk.pending.type };
    const state = userReducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(false);
  });

  test('обработка загрузки getUserThunk.pending', () => {
    const action = { type: getUserThunk.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(true);
  });

  test('обработка успешного выполнения getUserThunk.fulfilled', () => {
    const userMock = {
      _id: 'user3',
      name: 'Alex Smith',
      email: 'alex.smith@example.com'
    };

    const action = {
      type: getUserThunk.fulfilled.type,
      payload: { user: userMock }
    };

    const state = userReducer(initialState, action);
    expect(state.user).toEqual(userMock);
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(true);
  });

  test('обработка ошибки getUserThunk.rejected', () => {
    const action = {
      type: getUserThunk.rejected.type,
      error: { message: 'Ошибка получения пользователя' }
    };

    const state = userReducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.loginUserRequest).toBe(false);
    expect(state.error).toBe('Ошибка получения пользователя');
  });

  test('обработка загрузки updateUserThunk.pending', () => {
    const action = { type: updateUserThunk.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(true);
  });

  test('обработка успешного выполнения updateUserThunk.fulfilled', () => {
    const userMock = {
      _id: 'user4',
      name: 'Mary Lee',
      email: 'mary.lee@example.com'
    };

    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: { user: userMock }
    };

    const state = userReducer(initialState, action);
    expect(state.user).toEqual(userMock);
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(true);
  });

  test('обработка ошибки updateUserThunk.rejected', () => {
    const action = {
      type: updateUserThunk.rejected.type,
      error: { message: 'Ошибка обновления пользователя' }
    };

    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(false);
    expect(state.error).toBe('Ошибка обновления пользователя');
  });

  test('обработка загрузки getOrdersThunk.pending', () => {
    const action = { type: getOrdersThunk.pending.type };
    const state = userReducer(initialState, action);
    expect(state.ordersRequest).toBe(true);
  });

  test('обработка успешного выполнения getOrdersThunk.fulfilled', () => {
    const ordersMock = [
      { _id: 'order1', name: 'Order 1' },
      { _id: 'order2', name: 'Order 2' }
    ];

    const action = {
      type: getOrdersThunk.fulfilled.type,
      payload: ordersMock
    };

    const state = userReducer(initialState, action);
    expect(state.orders).toEqual(ordersMock);
    expect(state.ordersRequest).toBe(false);
  });

  test('обработка ошибки getOrdersThunk.rejected', () => {
    const action = {
      type: getOrdersThunk.rejected.type,
      error: { message: 'Ошибка получения заказов' }
    };

    const state = userReducer(initialState, action);
    expect(state.ordersRequest).toBe(false);
    expect(state.error).toBe('Ошибка получения заказов');
  });

  test('проверка редьюсера clearErrors', () => {
    const action = clearErrors();
    const state = userReducer(initialState, action);
    expect(state.error).toBeNull();
  });
});