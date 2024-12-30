import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../client/api";
import useStore from "../store/products";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const { incrementCartItems } = useStore();

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      console.log(response.data.product);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Product Details
        </h1>
        <img
          src={product?.image}
          alt="product-image"
          className="w-96 h-96 object-cover rounded-lg mb-6"
        />
        <div className="text-center">
          <p className="text-lg font-bold text-gray-700 mb-2">
            {product?.name}
          </p>
          <p className="text-sm text-gray-600 mb-4">{product?.price}</p>
          <button
            onClick={() =>
              incrementCartItems(product.id, product.name)
            }
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Product to Cart
          </button>
        </div>
        <div className="mt-4 text-gray-500">
          <p>
            Product ID: <span className="font-mono">{productId}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
