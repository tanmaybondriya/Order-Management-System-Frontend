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
    <div>
      <h2 style={{ textAlign: "center" }}>Products</h2>
      {products.length === 0 && <p>No products found</p>}

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid #444",
              padding: "20px",
              marginBottom: "20px",
              width: "300px", // Give it a fixed width so they look uniform
              borderRadius: "8px",
              textAlign: "center", // Center text inside the card
            }}
          >
            <h3>{product.name}</h3>
            <p>Price:Rs.{product.price}</p>
            <p>Stock:{product.stock}</p>

            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantities[product._id] || 1}
              onChange={(e) =>
                handleQuantityChange(product._id, e.target.value)
              }
            />

            <button
              disabled={product.stock === 0}
              onClick={() => handlePlaceOrder(product)}
            >
              {product.stock === 0 ? "Out of Stock" : "Place Order"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
