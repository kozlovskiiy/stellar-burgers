// import { ProfileOrdersUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
// import { FC } from 'react';
// import { useSelector, useDispatch } from '../../services/store';
// import { selectOrders } from '../../slices/ordersSlice';
// import { Preloader } from '@ui';
// import { useEffect } from 'react';
// import { fetchOrders } from '../../slices/ordersSlice';
// export const ProfileOrders: FC = () => {
//   const dispatch = useDispatch();
//   const orders = useSelector(selectOrders);

//   useEffect(() => {
//     if (orders.length === 0) {
//       dispatch(fetchOrders());
//     }
//   }, [dispatch, orders]);

//   if (orders.length === 0) {
//     return <Preloader />;
//   }

//   return <ProfileOrdersUI orders={orders} />;
// };

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
