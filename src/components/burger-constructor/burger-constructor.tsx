import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  resetConstructor,
  selectConstructorItems
} from '../../slices/constructorSlice';
import {
  closeOrderRequest,
  fetchNewOrder,
  selectOrderModalData,
  selectOrderRequest
} from '../../slices/ordersSlice';
export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || !constructorItems.bun._id) return;
    if (constructorItems.ingredients.length === 0) return;

    const ingredientsIds = constructorItems.ingredients
      .map((item) => item._id)
      .filter((id): id is string => id !== undefined);

    dispatch(
      fetchNewOrder([
        constructorItems.bun._id,
        ...ingredientsIds,
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(closeOrderRequest());
    dispatch(resetConstructor());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price : 0; // Проверяем на null
    return (
      bunPrice * 2 +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      )
    );
  }, [constructorItems]);

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
