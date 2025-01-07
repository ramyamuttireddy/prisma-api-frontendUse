import { Link } from "react-router-dom";
import userStore from "../store/user";
import { useEffect, useState } from "react";
import useStore from "../store/products";
import { axiosInstance } from "../client/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  const {
    cart,
    incrementCartItems,
    decrementCartItems,
    getTotalPrice,
    removeItems,
    resetCart,
  } = useStore();
  const { logOut, user } = userStore();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/products");
      console.log(response);
      const productsData = [...response.data];
      setProducts(productsData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPrice = getTotalPrice();

  console.log(products);
  return (
    <div>
      <div className="max-w-[1200px] mx-auto p-5">
        <div className="mb-8">
          {user ? (
            <div className="flex gap-4 items-center">
              <button
                onClick={() => {
                  resetCart();
                  logOut();
                }}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Logout
              </button>
              <Link to="/profile" className="text-blue-500 hover:underline">
                Profile
              </Link>
              <Link to="/cart" className="text-blue-500 hover:underline">
                Cart
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/profile" className="text-blue-500 hover:underline">
                Profile
              </Link>
              <Link
                to="/login"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        <div className="mb-8">
          {cart.map((cartItem) => (
            <div
              key={cartItem.cartId}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-4 shadow"
            >
              <div>
                <p className="font-bold">{cartItem.name}</p>
                <p>
                  ${cartItem.price} x {cartItem.quantity}
                </p>
              </div>
              <button
                onClick={() => removeItems(cartItem.cartId)}
                className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <header className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow mb-8">
          <span className="text-lg font-semibold">
            Total Items In Cart: {cart.length}
          </span>
          <span className="text-lg font-semibold">Price: ${totalPrice}</span>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg shadow hover:shadow-lg transition duration-300 justify-center"
            >
              <Link to={`products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />
              </Link>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => decrementCartItems(product.id)}
                    className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      incrementCartItems(
                        product.id,
                        product.name,
                        product.price,
                        product.quantity,
                        product.image
                      )
                    }
                    className="bg-orange-400 text-white px-3 py-2 rounded hover:bg-amber-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
