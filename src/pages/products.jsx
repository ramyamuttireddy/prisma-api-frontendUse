import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../client/api"
import useStore from "../store/products"

const Product = () => {
 const {productId} = useParams()
 const [product , setProduct] = useState()
 const {incrementCartItems} = useStore()

 const fetchProduct = async () => {
    try {
        const response = await axiosInstance.get(`/products/${productId}`)
        console.log(response.data.product)
        setProduct(response.data.product)
    } catch (error) {
       console.log(error) 
    }
 }

useEffect(() => {
 fetchProduct();
},[])

if(!product) {
    return <div>Loading</div>
}

return (
    <div>
 
        <div>
        product
            <p>{product?.name}</p>
            <p>{product?.description}</p>
            <button onClick={() => {incrementCartItems(product.id,product.name,product.description)}} className="border-2 border-black">
                Add Product to cart
            </button>
            <img src={product?.image} alt="product-image" width={400} height={400} />
            {productId}
        </div>
    </div>
)


}

export default Product;