import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { selectOrders } from '../../slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchOrders } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (!orders || !orders.orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders.orders} handleGetFeeds={() => {}} />;
};
