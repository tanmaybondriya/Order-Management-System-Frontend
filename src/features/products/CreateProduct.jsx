import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useProductStore from "./product.store";
import { notifySuccess, notifyError } from "../../utils/notify";
const createProductSchema = z.object({
  name: z.string().min(2, "2 characters required"),
  price: z.coerce.number().min(1, "min price should be 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
});

const CreateProduct = () => {
  const { createProduct } = useProductStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = async (data) => {
    try {
      await createProduct(data);
      notifySuccess("Product created Successfully");
      reset();
    } catch (error) {
      notifyError(error.response?.data?.message || "Creation failed");
    }
  };

  return (
    <div>
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} type="text" placeholder="Product Name" />

        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <input
          {...register("price")}
          type="number"
          placeholder="Enter Product price"
        />

        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}

        <input {...register("stock")} type="number" placeholder="Enter stock" />

        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
