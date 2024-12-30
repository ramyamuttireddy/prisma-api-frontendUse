import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useStore from "../store/products";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QaCyaKjZUK3Y9FGgdPHF74OjMbJCIvYZEvx480aRqCrPd3R7LEnxDmooTWx3C5yGX7BW5NJAwz9XuCjqq00tLPM00tF5zWRO3"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://prisma-api-frontend-use-kdkz.vercel.app/",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-center mb-6">
        Complete Your Payment
      </h2>

      <div className="mb-6">
        <PaymentElement className="p-4 border border-gray-300 rounded-lg" />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className={`w-full py-3 rounded-lg text-white font-semibold 
        ${
          !stripe
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 transition duration-200"
        }`}
      >
        Submit
      </button>
    </form>
  );
};

const Checkout = () => {
  const { clientSecret } = useStore();
  const options = {
    clientSecret: clientSecret,
  };
  return (
    <div>
      CheckOut Page
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
