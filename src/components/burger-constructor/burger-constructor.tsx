import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  setBun,
  addIngredient,
  removeIngredient
} from '../../slices/burgerSlice'; // Селекторы и экшены
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    // Логика для обработки заказа
  };

  const closeOrderModal = () => {
    // Логика для закрытия модального окна
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
