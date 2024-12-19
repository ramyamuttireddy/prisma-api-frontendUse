import { Link, Outlet } from "react-router-dom";
import React from "react";
import userStore from "../store/user";
import useStore from "../store/products";

function LayOut() {
    const {user ,  logOut} = userStore();
    const { getTotalCartItemsCount} = useStore();

    const totalItemsInCart = getTotalCartItemsCount();

    return(
        <div>
            <header className="bg-orange-200">
                <nav>
                    <ul className="flex gap-10 justify-center items-center">
                         <Link to="/">Home</Link>
                         <Link to="/cart">
                         Cart
                         {totalItemsInCart}
                         </Link>
                         {user ? <button onClick={logOut}>LogOut</button> : <Link to="/login">Login</Link>}
                         
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default LayOut;