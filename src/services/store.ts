import {
  combineReducers,
  configureStore,
  createSelector as selectorCreator
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import orderReducer from '../slices/ordersSlice';
// import modalReducer from '../slices/modalSlice';
import feedReducer from '../slices/feedSlice';
import userReducer from '../slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  builder: constructorReducer,
  orders: orderReducer,
  // modal: modalReducer,
  feed: feedReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
export const createSelector = selectorCreator.withTypes<RootState>();

export default store;
