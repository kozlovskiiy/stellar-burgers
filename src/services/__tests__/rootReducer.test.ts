import { initialState as userState } from '../../slices/userSlice';
import { initialState as feedState } from '../../slices/feedSlice';
import { initialState as ordersState } from '../../slices/ordersSlice';
import { initialState as ingredientsState } from '../../slices/ingredientsSlice';
import { initialState as constructorState } from '../../slices/constructorSlice';
import { rootReducer } from '../store';

describe('rootReducer', () => {
  it('должен инициализировать rootReducer с начальным состоянием', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      builder: constructorState,
      ingredients: ingredientsState,
      orders: ordersState,
      user: userState,
      feed: feedState
    });
  });
});
