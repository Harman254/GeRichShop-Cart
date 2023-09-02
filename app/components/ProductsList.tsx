import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import { UseProductsContextType } from "../context/ProductsProvider";
import { ReactElement } from "react";
import Product from "@/app/components/Product";

const ProductsList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();

  const { products } = useProducts();
  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);
      return (
        <Product
          key={product.sku}
          product={product}
          inCart={inCart}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
        />
      );
    });
  }
  const content = (
    <main className="main flex flex-wrap justify-around px-4 sm:px-8 main--products">
      {pageContent}
    </main>
  );

  return content;
};

export default ProductsList;
