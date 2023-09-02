type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: PropsType) => {
  const button = viewCart ? (
    <button onClick={() => setViewCart(false)} className="px-4 py-2 bg-black text-white rounded-md hover:shadow-xl hover:shadow-slate-700 hover:bg-slate-500">View Products </button>
  ) : (
    <button className="px-4 py-2 bg-black text-white rounded-md hover:shadow-xl hover:shadow-slate-700 hover:bg-slate-500" onClick={() => setViewCart(true)}>View Cart </button>
  );

  const content = <nav className="nav  flex justify-end gap-2">{button}</nav>;

  return content;
};

export default Nav;
