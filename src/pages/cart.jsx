import { Link } from "react-router-dom";
import useStore from "../store/products";

const Cart = () => {
  const { cart, getTotalPrice, removeItems } = useStore();

  const totalPrice = getTotalPrice();
  console.log(`cart`, JSON.stringify(cart, null, 2));
  return (
    <div>
      <div>
        cart $ {totalPrice}
        {cart.map((cartItem) => {
          return (
            <div key={cartItem.cartId}>
              <p>{cartItem.name}</p>
              <p>{cartItem.price}</p>$ {cartItem.quantity} <br />
              <img src={cartItem.image} alt="" className="w-40 h-40" />
              <button
                onClick={() => {
                  removeItems(cartItem.cartId);
                }}
                className="border-black border-2"
              >
                Remove the Item
              </button>
            </div>
          );
        })}
        <Link to={"/shipping"}>Shipping</Link>
      </div>
    </div>
  );
};
export default Cart;
