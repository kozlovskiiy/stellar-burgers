import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { RootState, useDispatch, useSelector } from '../../services/store';
import {
  fetchLoginUser,
  removeErrorText,
  setErrorText
} from '../../slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(removeErrorText());

    if (!email || !password) {
      dispatch(setErrorText('Please provide both email and password'));
      return;
    }
    await dispatch(fetchLoginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
