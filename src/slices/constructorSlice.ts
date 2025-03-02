import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TConstructorItems,
  TIngredient
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface ConstructorState {
  constructorItems: {
    bun: Partial<TIngredient> & { price: number };
    ingredients: TConstructorIngredient[];
  };
}

const initialState: ConstructorState = {
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(
      state,
      action: PayloadAction<{ price?: number } & Partial<TIngredient>>
    ) {
      state.constructorItems.bun = {
        price: action.payload.price ?? 0,
        ...action.payload
      };
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: uuidv4()
        });
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ index: number; upwards: boolean }>
    ) {
      const ingredientLink =
        state.constructorItems.ingredients[action.payload.index];

      if (action.payload.upwards) {
        state.constructorItems.ingredients[action.payload.index] =
          state.constructorItems.ingredients[action.payload.index - 1];
        state.constructorItems.ingredients[action.payload.index - 1] =
          ingredientLink;
      } else {
        state.constructorItems.ingredients[action.payload.index] =
          state.constructorItems.ingredients[action.payload.index + 1];
        state.constructorItems.ingredients[action.payload.index + 1] =
          ingredientLink;
      }
    },
    resetConstructor(state) {
      state.constructorItems.bun = {
        price: 0
      };
      state.constructorItems.ingredients = [];
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

// Селекторы

export const selectBun = (state: { builder: ConstructorState }) =>
  state.builder.constructorItems.bun;
export const selectIngredients = (state: { builder: ConstructorState }) =>
  state.builder.constructorItems.ingredients;
export const selectConstructorItems = (state: { builder: ConstructorState }) =>
  state.builder.constructorItems;
