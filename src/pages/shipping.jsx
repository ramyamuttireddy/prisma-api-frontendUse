import { vineResolver } from "@hookform/resolvers/vine";
import { useForm } from "react-hook-form";
import vine from "@vinejs/vine";
import { axiosInstance } from "../client/api";
import useStore from "../store/products";
import { useNavigate } from "react-router-dom";

const schema = vine.compile(
  vine.object({
    city: vine.string().maxLength(10),
    state: vine.string().maxLength(10),
    country: vine.string().maxLength(10),
  })
);

const Shipping = () => {
  const { cart, getTotalPrice, removeItemFromCart, updateclientSecret } =
    useStore();
  const navigate = useNavigate();

  const totalPrice = getTotalPrice();
  console.log(`cart`, JSON.stringify(cart, null, 2));

  const { register, handleSubmit, formState, getValues } = useForm({
    resolver: vineResolver(schema),
  });

  console.log(formState, JSON.stringify(formState, null, 2));

  const onSubmit = async () => {
    try {
      const orderItems = cart.map((cartItem) => {
        return {
          productId: cartItem.productId,
          price: cartItem.price,
          quantity: cartItem.quantity,
        };
      });
      const { city, state, country } = getValues();
      const deliveryAddress = city + state + country;
      console.log(`orderItems`, JSON.stringify(orderItems, null, 2));
      const response = await axiosInstance.post("/orders", {
        deliveryAddress,
        totalPrice: getTotalPrice(),
        orderItems: [...orderItems],
      });
      console.log(response.data);
      updateclientSecret(response.data.clientSecret);
      navigate("/checkout");
    } catch (error) {
      console.log("error in onSubmit", error);
      throw error;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="submit-handler"
        className="flex flex-col gap-4 bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">Enter Address</h2>
        <input
          placeholder="City"
          {...register("city")}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          placeholder="State"
          {...register("state")}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          placeholder="Country"
          {...register("country")}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Cart Summary</h2>
        <p className="text-lg mb-4">
          <span className="font-semibold">Total Price:</span> ${totalPrice}
        </p>
        <div className="space-y-4">
          {cart.map((cartItem) => (
            <div
              key={cartItem.cartId}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={cartItem.image}
                  alt={cartItem.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-semibold text-gray-800">{cartItem.name}</p>
                  <p className="text-sm text-gray-600">
                    ${cartItem.price} x {cartItem.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeItemFromCart(cartItem.cartId)}
                className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
