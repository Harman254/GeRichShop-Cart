  "use client"

import { useMemo, useReducer, createContext, ReactElement } from "react";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = {
  cart: CartItemType[];
};

const initialCartState: CartStateType = {
  cart: [],
};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};
const Reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload is missing ADD action");
      }

      const { sku, name, price } = action.payload;
      const FiltredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      const ItemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      const qty: number = ItemExists ? ItemExists.qty + 1 : 1;
      return { ...state, cart: [...FiltredCart, { sku, name, price, qty }] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload is missing REMOVE action");
      }
      const { sku, qty } = action.payload;

      const ItemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      if (!ItemExists) {
        throw new Error("Item Must exist inoder to update the Quantity");
      }

      const updatedItem: CartItemType = { ...ItemExists, qty };
      const FiltredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...FiltredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload is missing QUANTITY action");
      }
      const { sku } = action.payload;
      const FiltredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...FiltredCart] };
    }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Invalid action type");
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(Reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const TotalItems: number = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    const ItemA = Number(a.sku.slice(-4));
    const ItemB = Number(b.sku.slice(-4));

    return ItemA - ItemB;
  });

  return { dispatch, REDUCER_ACTIONS, TotalItems, totalPrice, cart };
};

export type useCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: useCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  TotalItems: 0,
  totalPrice: "",
  cart: [],
};

const CartContext = createContext<useCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType) => {
  return (
    <CartContext.Provider value={useCartContext(initialCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
