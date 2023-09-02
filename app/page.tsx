"use client";
import Cart from "@/app/components/Cart";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ProductsList from "./components/ProductsList";
import { useState } from "react";

export default function Home() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductsList />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  );
  return content;
}
