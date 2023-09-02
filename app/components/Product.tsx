import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement, memo } from "react";

type PropTypes = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  inCart,
  product,
  dispatch,
  REDUCER_ACTIONS,
}: PropTypes): ReactElement => {
  const img: string = `/images/${product.sku}.jpg`;
  console.log(img);

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? " → Item in Cart: ✔️" : null;

  const content = (
    <article className="product cursor-pointer transform hover:scale-105 hover:shadow-lg hover:bg-gray-100 p-2 transition-transform ease-in-out duration-300">
      <h3 className="text-lg font-semibold mb-3">{product.name}</h3>
      <img
        src={img}
        alt={product.name}
        className="product__img transform hover:scale-105 transition-transform ease-in-out duration-300"
      />
      <p className="mt-2">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button
        className="px-4 py-2 bg-black text-white rounded-md mt-2 hover:shadow-lg hover:scale-105 transition-transform ease-in-out duration-300"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </article>
  );

  return content;
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropTypes,
  { product: nextProduct, inCart: nextInCart }: PropTypes
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
