import { TIngredient } from '@utils-types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';

interface IngredientsState {
  ingredients: TIngredient[];
  bun: Partial<TIngredient>;
  isLoading: boolean;
}

export const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  bun: {
    price: 0
  }
};

// Асинхронный экшен для загрузки ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default ingredientsSlice.reducer;

// Селекторы
export const selectIngredients = (state: { ingredients: IngredientsState }) =>
  state.ingredients.ingredients;

export const selectIsLoading = (state: { ingredients: IngredientsState }) =>
  state.ingredients.isLoading;
