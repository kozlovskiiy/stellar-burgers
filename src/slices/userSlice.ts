import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';
import { TRegisterData, TLoginData } from '../utils/burger-api';
import {
  getUserApi,
  logoutApi,
  updateUserApi,
  loginUserApi,
  registerUserApi
} from '../utils/burger-api';

interface IUserState {
  user: TUser;
  userAuthorized: boolean;
  isInit: boolean;
  loading: boolean;
  errorText: string;
}

const initialState: IUserState = {
  user: {
    email: '',
    name: ''
  },
  userAuthorized: false,
  isInit: false,
  loading: false,
  errorText: ''
};

// Асинхронные экшены
export const getUserThunk = createAsyncThunk('user/get', async () =>
  getUserApi()
);

export const fetchLogout = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);

    if (response.success) {
      console.log('Access token:', response.accessToken); // Проверка токена
      localStorage.setItem('accessToken', response.accessToken);
    }

    return response;
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  const token = localStorage.getItem('accessToken');
  console.log('Access token from localStorage:', token); // Проверка извлечения токена

  if (token) {
    const response = await getUserApi();
    return response;
  }

  return null;
});

// Редьюсер
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init(state) {
      state.isInit = true;
    },
    setErrorText(state, action: PayloadAction<string>) {
      state.errorText = action.payload;
    },
    removeErrorText(state) {
      state.errorText = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // В редьюсере при инициализации
      .addCase(init, (state) => {
        state.isInit = true;

        // Попытаться получить пользователя из localStorage
        const user = localStorage.getItem('user');
        if (user) {
          state.user = JSON.parse(user);
          state.userAuthorized = true;
        } else {
          state.user = { name: '', email: '' };
          state.userAuthorized = false;
        }
      })
      // Получение данных пользователя
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.loading = false;
        state.userAuthorized = false;
        state.user = { name: '', email: '' };
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.userAuthorized = true;
      })
      // Выход пользователя
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user = { name: '', email: '' };
          state.userAuthorized = false;
          localStorage.removeItem('user');
        }
      })
      // Обновление данных пользователя
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user.name = action.payload.user.name;
          state.user.email = action.payload.user.email;
        }
      })
      // Авторизация пользователя
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorText = action.error.message!;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuthorized = true;
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      // Регистрация пользователя
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.errorText = action.error.message!;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuthorized = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.userAuthorized = true;
          state.user = action.payload.user;
        }
      });
  }
});

// Экспорты
export const { init, setErrorText, removeErrorText } = userSlice.actions;

export const selectUser = (state: { user: IUserState }) => state.user.user;
export const selectUserAuthorized = (state: { user: IUserState }) =>
  state.user.userAuthorized;
export const selectLoading = (state: { user: IUserState }) =>
  state.user.loading;
export const selectErrorText = (state: { user: IUserState }) =>
  state.user.errorText;

export default userSlice.reducer;
