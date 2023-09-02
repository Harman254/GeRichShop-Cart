import { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction } from "../context/CartProvider";
import { ReducerActionType } from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  REDUCER_ACTIONS: ReducerActionType;
  dispatch: React.Dispatch<ReducerAction>;
};

const CartLineItem = ({ dispatch, item, REDUCER_ACTIONS }: PropsType) => {
  const img: string = `/images/${item.sku}.jpg`;

  const LineTotal: number = item.qty * item.price;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;
  const optionValues: number[] = [];
  for (let i = 1; i <= highestQty; i++) {
    optionValues.push(i);
  }

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () => {
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });
  };
  const content = (
    <li className="cart__item grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-white shadow-md rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-lg">
      <div className="md:col-span-1 flex items-center justify-center">
        <img
          src={img}
          alt={item.name}
          className="w-16 h-16 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="md:col-span-3 flex flex-col justify-between">
        <div className="text-lg font-semibold" aria-label="Item Name">
          {item.name}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-gray-600" aria-label="Price Per Item">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(item.price)}
          </div>
          <div className="flex items-center">
            <label htmlFor="itemQty" className="mr-2">
              Quantity:
            </label>
            <select
              name="itemQty"
              id="itemQty"
              className="cart__select max-h-[48px]"
              value={item.qty}
              aria-label="Item Quantity"
              onChange={onChangeQty}
            >
              {options}
            </select>
          </div>
          <div className="text-gray-600" aria-label="Line Item Subtotal">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(LineTotal)}
          </div>
          <button
            className="cart__button px-3 py-2 max-h-[48px] hover:text-red-500"
            aria-label="Remove Item From Cart"
            title="Remove Item From Cart"
            onClick={onRemoveFromCart}
          >
            ❌
          </button>
        </div>
      </div>
    </li>
  );
  return content;
};

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;
