import { useEffect } from "react";
import useOrderStore from "./order.store";
import { notifyError, notifySuccess } from "../../utils/notify";

const OrderHistory = () => {
  const { orders, fetchOrders, cancelOrder, deleteOrders } = useOrderStore();
  const cancellingIds = useOrderStore((state) => state.cancellingIds);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (order) => {
    try {
      await cancelOrder(order);
      notifySuccess("Order cancelled successfully");
    } catch (error) {
      notifyError(error.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "300px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Order History</h2>
      <div>
        <button
          onClick={() => deleteOrders()}
          style={{
            padding: "10px",
            margin: "5px",
          }}
        >
          Delete cancelled orders
        </button>
      </div>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            border: "1px solid #1f1919",
            borderRadius: "8px ",
            marginBottom: "20px",
            textAlign: "center",
            width: "300px",
          }}
        >
          <p>Product:{order.product.name}</p>
          <p>Quantity:{order.quantity}</p>
          <p>Status:{order.status}</p>
          {order.status === "PLACED" && (
            <button
              disabled={cancellingIds.includes(order._id)}
              onClick={() => {
                handleCancel(order);
              }}
            >
              {cancellingIds.includes(order._id)
                ? "Cancelling..."
                : "Cancel Order"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
