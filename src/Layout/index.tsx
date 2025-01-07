import { Link, Outlet } from "react-router-dom";
import React from "react";
import userStore from "../store/user";
import useStore from "../store/products";

function LayOut() {
  const { user, logOut } = userStore();
  const { getTotalCartItemsCount } = useStore();

  const totalItemsInCart = getTotalCartItemsCount();

  return (
    <div>
      <header className="bg-orange-200 py-4">
        <nav>
          <ul className="flex gap-10 justify-center items-center text-lg font-medium">
            <li>
              <Link to="/" className="hover:text-orange-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-orange-600 transition-colors flex items-center"
              >
                Cart
                <span className="ml-2 text-sm bg-white text-orange-600 rounded-full px-2 py-1">
                  {totalItemsInCart}
                </span>
              </Link>
            </li>
            <li>
              {user ? (
                <button
                  onClick={logOut}
                  className="text-orange-600 hover:text-orange-800"
                >
                  LogOut
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-orange-600 hover:text-orange-800"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main className="py-8">
        <Outlet />
      </main>
    </div>
  );
}
export default LayOut;
