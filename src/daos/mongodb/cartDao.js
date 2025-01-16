import MongoDao from "./mongoDao.js";
import { CartModel } from "../mongodb/models/cartModel.js";

class CartDao extends MongoDao {
  constructor() {
    super(CartModel);
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) throw new Error("Cart not found");

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity; // Actualiza cantidad
      } else {
        cart.products.push({ product: productId, quantity }); // Agrega nuevo producto
      }

      return await cart.save();
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const cartDao = new CartDao();
