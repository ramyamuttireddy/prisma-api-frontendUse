import { Link } from "react-router-dom";
import useStore from "../store/products";

const Cart = () => {
  const { cart, getTotalPrice, removeItems } = useStore();

  const totalPrice = getTotalPrice();
  console.log(`cart`, JSON.stringify(cart, null, 2));
  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">
          Cart Total: ${totalPrice}
        </h2>
        <div className="space-y-6">
          {cart.map((cartItem) => (
            <div
              key={cartItem.cartId}
              className="flex flex-col md:flex-row items-center gap-6 bg-white p-4 rounded-lg shadow hover:shadow-lg transition "
            >
              <img
                src={cartItem.image}
                alt={cartItem.name}
                className="md:w-32 md:h-32 rounded-lg border"
                loading="lazy"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{cartItem.name}</h3>
                <p className="text-gray-600">Price: ${cartItem.price}</p>
                <p className="text-gray-600">Quantity: {cartItem.quantity}</p>
              </div>
              <button
                onClick={() => removeItems(cartItem.cartId)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove Item
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link
            to="/shipping"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Shipping
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Cart;
