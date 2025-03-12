import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TConstructorItems,
  TIngredient
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface ConstructorState {
  constructorItems: {
    bun: (Partial<TIngredient> & { price: number }) | null;
    ingredients: TConstructorIngredient[];
  };
}

export const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
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
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        return {
          payload: {
            ...ingredient,
            id: uuidv4()
          } as TConstructorIngredient
        };
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
      const { index, upwards } = action.payload;
      const ingredients = state.constructorItems.ingredients;

      if (
        (upwards && index > 0) ||
        (!upwards && index < ingredients.length - 1)
      ) {
        const swapIndex = upwards ? index - 1 : index + 1;
        [ingredients[index], ingredients[swapIndex]] = [
          ingredients[swapIndex],
          ingredients[index]
        ];
      }
    },
    resetConstructor(state) {
      state.constructorItems.bun = null;
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
