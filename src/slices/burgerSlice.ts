// import { TIngredient } from '@utils-types';
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { getIngredientsApi } from '../utils/burger-api';

// interface IngredientsState {
//   ingredients: TIngredient[];
//   isLoading: boolean;
// }

// const initialState: IngredientsState = {
//   ingredients: [],
//   isLoading: false
// };

// // Асинхронный экшен для загрузки ингредиентов
// export const fetchIngredients = createAsyncThunk(
//   'burger/fetchIngredients',
//   async () => {
//     const ingredients = await getIngredientsApi();
//     return ingredients;
//   }
// );

// const burgerSlice = createSlice({
//   name: 'burger',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchIngredients.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(
//         fetchIngredients.fulfilled,
//         (state, action: PayloadAction<TIngredient[]>) => {
//           state.ingredients = action.payload;
//           state.isLoading = false;
//         }
//       )
//       .addCase(fetchIngredients.rejected, (state) => {
//         state.isLoading = false;
//       });
//   }
// });

// export default burgerSlice.reducer;

// // **Исправленные селекторы**
// export const selectIngredients = (state: { stellarBurger: IngredientsState }) =>
//   state.stellarBurger.ingredients;

// export const selectIsLoading = (state: { stellarBurger: IngredientsState }) =>
//   state.stellarBurger.isLoading;
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: any | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
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
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<any>) => {
      state.orderModalData = action.payload;
    },
    clearOrder: (state) => {
      state.constructorItems = { bun: null, ingredients: [] };
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
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

export const {
  setBun,
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setOrderModalData,
  clearOrder
} = burgerSlice.actions;

export default burgerSlice.reducer;

// Селекторы для конструктора
export const selectConstructorItems = (state: {
  stellarBurger: IngredientsState;
}) => state.stellarBurger.constructorItems;

export const selectOrderRequest = (state: {
  stellarBurger: IngredientsState;
}) => state.stellarBurger.orderRequest;

export const selectOrderModalData = (state: {
  stellarBurger: IngredientsState;
}) => state.stellarBurger.orderModalData;

export const selectIngredients = (state: { stellarBurger: IngredientsState }) =>
  state.stellarBurger.ingredients;

export const selectIsLoading = (state: { stellarBurger: IngredientsState }) =>
  state.stellarBurger.isLoading;
