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
  const { cart, getTotalPrice, removeItemFromCart ,updateclientSecret } =
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
      updateclientSecret(response.data.clientSecret)
      navigate("/checkout")
    } catch (error) {
      console.log("error in onSubmit", error);
      throw error;
    }
  };

  return (
    <div className="grid grid-cols-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="submit-handler"
        className="flex flex-col gap-3 "
      >
        <input
          placeholder="city"
          {...register("city")}
          className="border-2 border-black w-[300px]"
        />
        <input
          placeholder="state"
          {...register("state")}
          className="border-2 border-black w-[300px]"
        />
        <input
          placeholder="country"
          {...register("country")}
          className="border-2 border-black w-[300px]"
        />
        <button type="submit" className="border-2 border-black w-[300px]">
          submit
        </button>
      </form>
      <div>
        cart ${totalPrice}
        {cart.map((cartItem) => {
          return (
            <div key={cartItem.cartId}>
              {cartItem.name} {cartItem.price} ${cartItem.quantity}
              <br />
              <img src={cartItem.image} width={40} height={40} />
              <button
                onClick={() => {
                  removeItemFromCart(cartItem.cartId);
                }}
              >
                remove from cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shipping;
