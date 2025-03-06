// import { FC, useMemo } from 'react';
// import { Preloader } from '../ui/preloader';
// import { OrderInfoUI } from '../ui/order-info';
// import { TIngredient } from '@utils-types';
// import { useSelector, useDispatch } from '../../services/store';
// import { selectOrders } from '../../slices/ordersSlice';
// import { selectIngredients } from '../../slices/ingredientsSlice';
// import { useParams } from 'react-router-dom';
// export const OrderInfo: FC = () => {
//   const orders = useSelector(selectOrders);
//   const ingredients = useSelector(selectIngredients);
//   const { number } = useParams<{ number: string }>();
//   console.log('Number from URL:', number); // Логируем параметр
//   console.log(orders);
//   const orderData = orders.find(
//     (order) => order.number === parseInt(number!)
//   ) || {
//     createdAt: '',
//     ingredients: [],
//     _id: '',
//     status: '',
//     name: '',
//     updatedAt: 'string',
//     number: 0
//   };

//   /* Готовим данные для отображения */
//   const orderInfo = useMemo(() => {
//     if (!orderData || !ingredients.length) return null;

//     const date = new Date(orderData.createdAt);

//     type TIngredientsWithCount = {
//       [key: string]: TIngredient & { count: number };
//     };

//     const ingredientsInfo = orderData.ingredients.reduce(
//       (acc: TIngredientsWithCount, item) => {
//         if (!acc[item]) {
//           const ingredient = ingredients.find((ing) => ing._id === item);
//           if (ingredient) {
//             acc[item] = {
//               ...ingredient,
//               count: 1
//             };
//           }
//         } else {
//           acc[item].count++;
//         }

//         return acc;
//       },
//       {}
//     );

//     const total = Object.values(ingredientsInfo).reduce(
//       (acc, item) => acc + item.price * item.count,
//       0
//     );

//     return {
//       ...orderData,
//       ingredientsInfo,
//       date,
//       total
//     };
//   }, [orderData, ingredients]);

//   if (!orderInfo) {
//     return <Preloader />;
//   }

//   return <OrderInfoUI orderInfo={orderInfo} />;
// };
// import { FC, useMemo } from 'react';
// import { Preloader } from '../ui/preloader';
// import { OrderInfoUI } from '../ui/order-info';
// import { TIngredient } from '@utils-types';
// import { useSelector } from '../../services/store';
// import { selectOrdersForPage } from '../../slices/selectors'; // Универсальный селектор
// import { selectIngredients } from '../../slices/ingredientsSlice';
// import { useLocation, useParams } from 'react-router-dom';

// export const OrderInfo: FC = () => {
//   const ingredients = useSelector(selectIngredients);
//   const { number } = useParams<{ number: string }>(); // Получаем номер заказа
//   const location = useLocation();

//   // Определяем источник по URL
//   const source = location.pathname.includes('/feed/') ? 'feed' : 'profile';
//   // console.log(source);
//   // Получаем список заказов в зависимости от источника
//   const orders = useSelector((state) => selectOrdersForPage(state, source));

//   // console.log('Number from URL:', number);
//   // console.log('Source:', source);
//   // console.log(orders);

//   if (!orders) {
//     return <Preloader />;
//   }

//   // Проверяем, является ли orders массивом, прежде чем использовать find
//   const orderData = Array.isArray(orders)
//     ? orders.find((order) => order.number === parseInt(number!))
//     : null;

//   // Если orderData не найдено, создаем пустой объект
//   const order = orderData || {
//     createdAt: '',
//     ingredients: [],
//     _id: '',
//     status: '',
//     name: '',
//     updatedAt: 'string',
//     number: 0
//   };

//   /* Готовим данные для отображения */
//   const orderInfo = useMemo(() => {
//     if (!order || !ingredients.length) return null;

//     const date = new Date(order.createdAt);

//     type TIngredientsWithCount = {
//       [key: string]: TIngredient & { count: number };
//     };

//     const ingredientsInfo = order.ingredients.reduce(
//       (acc: TIngredientsWithCount, item) => {
//         if (!acc[item]) {
//           const ingredient = ingredients.find((ing) => ing._id === item);
//           if (ingredient) {
//             acc[item] = {
//               ...ingredient,
//               count: 1
//             };
//           }
//         } else {
//           acc[item].count++;
//         }

//         return acc;
//       },
//       {}
//     );

//     const total = Object.values(ingredientsInfo).reduce(
//       (acc, item) => acc + item.price * item.count,
//       0
//     );

//     return {
//       ...order,
//       ingredientsInfo,
//       date,
//       total
//     };
//   }, [order, ingredients]);

//   if (!orderInfo) {
//     return <Preloader />;
//   }

//   return <OrderInfoUI orderInfo={orderInfo} />;
// };

import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { selectOrderByNumber } from '../../slices/selectors';
import { selectIngredients } from '../../slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { fetchOrderByNumber } from '../../slices/ordersSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const { number } = useParams<{ number: string }>();

  const order = useSelector((state) =>
    selectOrderByNumber(state, parseInt(number!))
  );

  useEffect(() => {
    if (!order) {
      dispatch(fetchOrderByNumber(parseInt(number!)));
    }
  }, [dispatch, number, order]);

  if (!order || !ingredients.length) {
    return <Preloader />;
  }

  const orderInfo = useMemo(() => {
    const date = new Date(order.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [order, ingredients]);

  return <OrderInfoUI orderInfo={orderInfo} />;
};
