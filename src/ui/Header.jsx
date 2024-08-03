import { Link } from "react-router-dom";
import Username from "../features/user/Username";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header className="border-b border-b-stone-500 bg-yellow-500 px-4 py-3 uppercase sm:py-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
