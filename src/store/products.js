import { nanoid } from "nanoid/non-secure";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        cart: [],

        setCart: (cartItems) => {
          const { cart } = get();
          console.log(cart);
          set(cartItems);
        },

        incrementCartItems: (id, name, price, quantity, image) => {
          console.log("item");
          const { cart } = get();
          const existingCardItem = cart.find(
            (cartItem) => cartItem.productId === id
          );
          if (existingCardItem) {
            const updatedCart = cart.map((cartItem) => {
              if (cartItem.productId === id) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                };
              }
              return cartItem;
            });
            set({ cart: updatedCart });
          } else {
            const cartItem = {
              cartId: "cart" + nanoid(),
              productId: id,
              name: name,
              price: price,
              image: image,
              quility: 1,
            };
            console.log(image);
            const updatedCart = [...cart, cartItem];
            set({ cart: updatedCart });
          }
        },

        decrementCartItems: (id) => {
          const { cart } = get();
          const updatedCart = cart.map((cartItem) => {
            if (cartItem.productId === id && cartItem.quantity > 0) {
              return {
                ...cartItem,
                quantity: Math.max(cartItem.quantity - 1, 0),
              };
            }
            return cartItem;
          });

          set({ cart: updatedCart });
        },

        getTotalPrice: () => {
          const { cart } = get();
          const totalPrice = cart.reduce((sum, element) => {
            return (sum += element.price * element.quantity);
          }, 0);

          return totalPrice;
        },

        getTotalCartItemsCount: () => {
          const { cart } = get();
          const totalCount = cart.reduce((sum, element) => {
            return (sum += element.quantity);
          }, 0);

          return totalCount;
        },

        removeItems: (id) => {
          const { cart } = get();
          const FlilterItem = cart.filter((item) => item.cartId !== id);
          set({ cart: FlilterItem });
        },
      }),

      { name: "cart" }
    )
  )
);

export default useStore;
