import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import useStore from '../store/products';

const stripePromise = loadStripe('pk_test_51QaCyaKjZUK3Y9FGgdPHF74OjMbJCIvYZEvx480aRqCrPd3R7LEnxDmooTWx3C5yGX7BW5NJAwz9XuCjqq00tLPM00tF5zWRO3');


const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};


 const Checkout = () => {
  const {clientSecret} = useStore()
  const options = {
    clientSecret: clientSecret,
  };
    return (
      <div>CheckOut Page  
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
         </Elements>
        )}
      
      </div>  
    )
 }

 export default Checkout