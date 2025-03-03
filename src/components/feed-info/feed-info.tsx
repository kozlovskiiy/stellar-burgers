// import { FC, useEffect } from 'react';

// import { TOrder } from '@utils-types';
// import { FeedInfoUI } from '../ui/feed-info';
// import { useDispatch, useSelector } from '../../services/store';
// import { fetchOrders, selectOrders } from '../../slices/feedSlice';

// const getOrders = (orders: TOrder[], status: string): number[] =>
//   orders
//     .filter((item) => item.status === status)
//     .map((item) => item.number)
//     .slice(0, 20);

// export const FeedInfo: FC = () => {
//   /** TODO: взять переменные из стора */
//   const orders: TOrder[] = [];
//   const feed = {};

//   const readyOrders = getOrders(orders, 'done');

//   const pendingOrders = getOrders(orders, 'pending');

//   return (
//     <FeedInfoUI
//       readyOrders={readyOrders}
//       pendingOrders={pendingOrders}
//       feed={feed}
//     />
//   );
// };

import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders, selectOrders } from '../../slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const { orders = [], total, totalToday } = useSelector(selectOrders) || {};

  const feed = {
    total,
    totalToday
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};

// const orders: TOrder[] = useAppSelector(selectOrders);
// const total = useAppSelector(selectTotalOrders);
// const totalToday = useAppSelector(selectTodayOrders);
