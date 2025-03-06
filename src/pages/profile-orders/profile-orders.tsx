import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { userOrdersSelector, getOrdersThunk } from '../../slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { TOrder } from '@utils-types';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(userOrdersSelector);
  console.log(orders);
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  if (orders.length === 0) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
