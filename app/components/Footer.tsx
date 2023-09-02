import useCart from "../hooks/useCart"


type PropsType = {
  viewCart: boolean,
}
const Footer = ({viewCart}: PropsType) => {
const {TotalItems, totalPrice} = useCart();

const year: number = new Date().getFullYear();

const pageContent = viewCart ? (<p>Shopping Cart &copy; {year}</p>) : (
    <>
    <p className="font-bold">Total Items:{TotalItems}</p>
    <p className="font-bold">Total Price:{totalPrice}</p>
    <p>Shopping Cart &copy; {year}</p>
    
    </>
)

const content = (
  <footer className="footer flex-grow flex flex-col  p-4 justify-end">
    {pageContent}
  </footer>
)

  return content
}

export default Footer
