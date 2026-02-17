import { useState } from "react";
import useProductStore from "./product.store";
import { notifySuccess, notifyError } from "../../utils/notify";

const CreateProduct = () => {
  const { createProduct } = useProductStore();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });
      notifySuccess("Product created Successfully");

      setFormData({ name: "", price: "", stock: "" });
    } catch (error) {
      notifyError(error.response?.data?.message || "Creation failed");
    }
  };

  return (
    <div>
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;
