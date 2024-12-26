import { useForm } from "react-hook-form";
import useStore from "../store/products";
import vine from "@vinejs/vine";
import { vineResolver } from "@hookform/resolvers/vine";
import { axiosInstance } from "../client/api";
import { useEffect } from "react";

const schema = vine.compile(
  vine.object({
    city: vine.string().maxLength(10),
    state: vine.string().maxLength(10),
    country: vine.string().maxLength(10),
  })
);

const Shipping = () => {
  const { cart, getTotalPrice, removeItems } = useStore();

  const totalPrice = getTotalPrice();
  console.log(`cart`, JSON.stringify(cart, null, 2));

  const { register, handleSubmit, formState, getValues } = useForm({
    resolver: vineResolver(schema),
  });
  console.log(`formState`, JSON.stringify(formState, null, 2));

  const onSubmit = async() => {
    try {
      const orderItems = cart.map((cartItem) => {
        return {
          price : cartItem.price,
          quility:cartItem.quility,
          productId:cartItem.productId
        } 
      })
      const { city, state, country } = getValues();
      const deliveryAddress = city + state + country;
      console.log(`orderItems` , JSON.stringify(orderItems , null,2));
      const response = await axiosInstance.post("/order/create", {
        deliveryAddress,
        totalPrice,
        orderItems : [...orderItems],
      })
      console.log(response.data);
    } catch (e) {
      console.log("error on submit",e);
    }
  };

  useEffect(() => {
  },[])

  return (
    <div className="grid grid-cols-2 justify-end items-center m-[0_auto] max-w-[1440px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[500px]"
        id="submit-handler"
      >
        <input
         placeholder="city"
          {...register("city")}
          className="border-2 border-black p-1"
        />
        <input
        placeholder="state"
          {...register("state")}
          className="border-2 border-black p-1"
        />
        <input
        placeholder="country"
          {...register("country")}
          className="border-2 border-black p-1"
        />
        <button className="border-2 border-black p-1 w-[200px]" type="submit">
          Submit
        </button>
      </form>

      <div>
        cart $ {totalPrice}
        {cart.map((cartItem) => {
          return (
            <div key={cartItem.cartId}>
              <p>{cartItem.name}</p>
              <p>{cartItem.price}</p>$ {cartItem.quility} <br />
              <img src={cartItem.image} alt="" width={40} height={40} />
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
      </div>
    </div>
  );
};
export default Shipping;
