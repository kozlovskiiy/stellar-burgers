// // slices/constructorSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TIngredient, TConstructorIngredient } from '@utils-types';

// interface ConstructorState {
//   bun: TIngredient | null;
//   ingredients: TConstructorIngredient[];
// }

// const initialState: ConstructorState = {
//   bun: null,
//   ingredients: []
// };

// const constructorSlice = createSlice({
//   name: 'constructor',
//   initialState,
//   reducers: {
//     setBun: (state, action: PayloadAction<TIngredient>) => {
//       state.bun = action.payload;
//     },
//     addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
//       state.ingredients.push(action.payload);
//     },
//     removeIngredient: (
//       state,
//       action: PayloadAction<TConstructorIngredient>
//     ) => {
//       state.ingredients = state.ingredients.filter(
//         (ingredient) => ingredient.id !== action.payload.id
//       );
//     }
//   }
// });

// export const { setBun, addIngredient, removeIngredient } =
//   constructorSlice.actions;

// export default constructorSlice.reducer;

// // Селекторы для конструктора
// export const selectConstructorItems = (state: {
//   constructor: ConstructorState;
// }) => state.constructor;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient | null>) {
      state.bun = action.payload;
    },
    addIngredient: {
      prepare: (payload: TIngredient) => ({
        payload: { ...payload, id: uuidv4() }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ index: number; upwards: boolean }>
    ) {
      const ingredientLink = state.ingredients[action.payload.index];

      if (action.payload.upwards) {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index - 1];
        state.ingredients[action.payload.index - 1] = ingredientLink;
      } else {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index + 1];
        state.ingredients[action.payload.index + 1] = ingredientLink;
      }
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
