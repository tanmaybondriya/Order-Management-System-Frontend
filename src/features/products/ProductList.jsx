import { useEffect, useState } from "react";
import useProductStore from "./product.store";
import useOrderStore from "../orders/order.store";
import { notifyError, notifySuccess } from "../../utils/notify";

const ProductList = () => {
  const { products, loading, fetchProducts, decreaseStock } = useProductStore();
  const { createOrders } = useOrderStore();
  const [quantities, setQuantities] = useState({});

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
      decreaseStock(product._id, quantity);
      notifySuccess("Order placed successfully");
    } catch (error) {
      notifyError(error.response?.data?.message, "Order failed");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

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
