import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../slices/feedSlice';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchOrders } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];

  if (!orders || !orders.orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders.orders} handleGetFeeds={() => {}} />;
};
