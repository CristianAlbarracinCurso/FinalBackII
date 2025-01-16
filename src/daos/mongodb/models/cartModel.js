import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Relación con el usuario
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "products", required: true }, // Relación con productos
      quantity: { type: Number, required: true, default: 1 }, // Cantidad del producto
    },
  ],
});

export const CartModel = model("carts", CartSchema);