import React from "react";
import Nav from "./Nav";
import useCart from "../hooks/useCart";
import Link from "next/link"

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {

  const { TotalItems, totalPrice } = useCart();
  const content = (
    <header className="header sticky top-0 z-10 border-b px-4">
      <div className="header__title-bar flex justify-between mb-2">
        <h1 className="font-extrabold font-serif  text-2xl text-slate-600 pl-4"><Link href="/">GeRichShop</Link></h1>
        <div className="header__price-box">
          <p className="font-bold px-4">Total Items:{TotalItems}</p>
          <p className="font-bold px-4">Total Price:{totalPrice}</p>
        </div>
      </div>
      <Nav  viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );

  return content;
};

export default Header;
