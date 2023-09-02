import {useContext} from 'react';
import { useCartContextType } from '../context/CartProvider';
import CartContext from '../context/CartProvider';



const useCart = (): useCartContextType => {
  return useContext(CartContext);
}

export default useCart;