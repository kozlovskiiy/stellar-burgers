import { TIngredient } from '@utils-types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false
};

// Асинхронный экшен для загрузки ингредиентов
export const fetchIngredients = createAsyncThunk(
  'burger/fetchIngredients',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

const burgerSlice = createSlice({
  name: 'burger',
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

export default burgerSlice.reducer;

// **Исправленные селекторы**
export const selectIngredients = (state: { stellarBurger: IngredientsState }) =>
  state.stellarBurger.ingredients;

export const selectIsLoading = (state: { stellarBurger: IngredientsState }) =>
  state.stellarBurger.isLoading;
