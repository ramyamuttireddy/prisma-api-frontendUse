
import useStore from '../store/products';




export default function Cart() {
const {cart, getTotalPrice , removeItems } = useStore()

const totalPrice =getTotalPrice();
  return (
    <div>
     <div>

      cart  $ {totalPrice}
     {cart.map((cartItem) => {
        return (
          <div key={cartItem.cartId}>
            <p>{cartItem.name}</p>
           <p>{cartItem.price}</p> 
             $ {cartItem.quility} <br />
             <img src={cartItem.image} alt="" width={200} height={120} />
            <button onClick={() => {removeItems(cartItem.cartId)}} className="border-black border-2">
              Remove the Item
            </button>

          </div>
        );
      })}
     </div>
    </div>
  )
}
