// import {
//   ConstructorPage,
//   Feed,
//   ForgotPassword,
//   Login,
//   NotFound404,
//   Profile,
//   ProfileOrders,
//   Register,
//   ResetPassword
// } from '@pages';
// import '../../index.css';
// import styles from './app.module.css';
// import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import { ProtectedRoute } from '../protected-route/protected-route';
// import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
// import { useDispatch } from '../../services/store';
// import { useEffect } from 'react';
// import { getUserThunk } from '../../slices/userSlice';

// const App = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const backgroundLocation = location.state?.background;

//   useEffect(() => {
//     dispatch(getUserThunk());
//   }, []);

//   return (
//     <div className={styles.app}>
//       <AppHeader />

//       {/* Основные страницы */}
//       <Routes location={backgroundLocation || location}>
//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/feed' element={<Feed />} />
//         <Route path='*' element={<NotFound404 />} />

//         <Route
//           path='/login'
//           element={
//             <ProtectedRoute>
//               <Login />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/register'
//           element={
//             <ProtectedRoute>
//               <Register />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/forgot-password'
//           element={
//             <ProtectedRoute>
//               <ForgotPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/reset-password'
//           element={
//             <ProtectedRoute>
//               <ResetPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile'
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile/orders'
//           element={
//             <ProtectedRoute>
//               <ProfileOrders />
//             </ProtectedRoute>
//           }
//         />
//         <Route path='/feed/:number' element={<OrderInfo />} />
//         <Route path='/ingredients/:id' element={<IngredientDetails />} />
//         <Route
//           path='/profile/orders/:number'
//           element={
//             <ProtectedRoute>
//               <OrderInfo />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       {/* Модалки */}
//       {backgroundLocation && (
//         <Routes>
//           <Route
//             path='/feed/:number'
//             element={
//               <Modal title={'Заказ'} onClose={() => {}}>
//                 <OrderInfo />
//               </Modal>
//             }
//           />
//           <Route
//             path='/ingredients/:id'
//             element={
//               <Modal title={'Описание ингредиента'} onClose={() => {}}>
//                 <IngredientDetails />
//               </Modal>
//             }
//           />
//           <Route
//             path='/profile/orders/:number'
//             element={
//               <ProtectedRoute>
//                 <Modal title={'Заказ'} onClose={() => {}}>
//                   <OrderInfo />
//                 </Modal>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       )}
//     </div>
//   );
// };

// export default App;

import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from '../../services/store';
import {
  ConstructorPage,
  Feed,
  Profile,
  ProfileOrders,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

import { ProtectedRoute } from '../protected-route/protected-route';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { getUserThunk } from '../../slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUserThunk());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Информация о заказе'} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={'Информация о заказе'} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
