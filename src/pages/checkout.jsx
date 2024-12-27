import { useLocation } from "react-router-dom"

 const Checkout = () => {
    const {Location} = useLocation()
    return (
      <div>CheckOut Page {Location.state.clientSecret}</div>  
    )
 }

 export default Checkout