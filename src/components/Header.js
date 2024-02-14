import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { LOGO_URL } from "../utilities/constant";
import { useSelector } from "react-redux";

const Header = () => {
  const items = useSelector((store) => store?.cart?.items);

  const numberOfItems = items.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.count;
  }, 0);
  return (
    <>
      <div className="flex fixed top-0 z-20 bg-white  left-0 border-b border-solid border-gray-200 shadow-md  shadow-gray-400 w-full text-xl justify-between px-10 py-2 items-center">
        <div>
          <Link to="/">
            <img className="w-24" src={LOGO_URL} alt="logo" />
          </Link>
        </div>
        <nav>
          <ul className="flex gap-x-8 items-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="mr-4 w-fit relative cursor-pointer hover:drop-shadow-xl transition-all duration-300 ease-in-out sm:mt-0 mt-2.5">
          <Link to="/cart" className="no-underline cursor-pointer">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            <h4 className="absolute top-0 right-0 text-sm  bg-red-500 text-white px-[5px] rounded-md -translate-y-2/4 translate-x-2/4">
              {numberOfItems || 0}
            </h4>
          </Link>
        </div>
      </div>
      <div className="h-[70px] w-full"></div>
    </>
  );
};

export default Header;
