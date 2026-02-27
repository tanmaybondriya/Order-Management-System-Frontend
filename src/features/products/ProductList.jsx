import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useOrderStore from "../orders/order.store";
import { notifyError, notifySuccess } from "../../utils/notify";
import { fetchProductApi } from "./product.api";

const ProductList = () => {
  const queryClient = useQueryClient();
  // const { fetchProducts, decreaseStock } = useProductStore();
  const { createOrders } = useOrderStore();
  const [quantities, setQuantities] = useState({});
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductApi,
  });
  const products = data?.data?.products || [];

  const handleQuantityChange = (productId, value) => {
    setQuantities({
      ...quantities,
      [productId]: Number(value),
    });
  };

  const handlePlaceOrder = async (product) => {
    const quantity = quantities[product._id] || 1;
    if (quantity > product.stock) {
      notifyError("the quanitity is greater than the stock");
      return;
    }
    try {
      await createOrders({
        productId: product._id,
        quantity,
      });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      notifySuccess("Order placed successfully");
    } catch (error) {
      notifyError(error.response?.data?.message, "Order failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load products. Please try again</p>;
  return (
    <div className="p-6">
      <h2>Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 && <p>No products found</p>}

        {products.map((product) => (
          <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg transition">
            <h3>{product.name}</h3>
            <p>Price: Rs.{product.price}</p>
            <p>
              <span
                className={`text-md px-2 py-1 rounded w-fit${product.stock === 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
              >
                Stock: {product.stock}
              </span>
            </p>
            <div className="flex gap-2 items-center mt-2">
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantities[product._id] || 1}
                onChange={(e) =>
                  handleQuantityChange(product._id, e.target.value)
                }
                className="w-20 border rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                disabled={product.stock === 0}
                onClick={() => handlePlaceOrder(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded p-2 font-medium disabled:opacity-50"
              >
                {product.stock === 0 ? "Out of Stock" : "Place Order"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
