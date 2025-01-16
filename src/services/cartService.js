import Services from "./serviceManager.js";
import { cartDao } from "../daos/mongodb/cartDao.js";
import { TicketModel } from "../daos/mongodb/models/ticketModel.js";
import { ProductModel } from "../daos/mongodb/models/productModel.js";

class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  async purchaseById(cartId, userEmail) {
    try {
      const cart = await this.dao.getById(cartId);
      if (!cart) throw new Error("Cart not found");

      let totalAmount = 0;
      const failedProducts = [];
      const successProducts = [];

      for (const item of cart.products) {
        const product = await ProductModel.findById(item.product);
        if (product.disponibilidad >= item.quantity) {
          product.disponibilidad -= item.quantity;
          await product.save();

          totalAmount += product.precio * item.quantity;
          successProducts.push(item);
        } else {
          failedProducts.push(item);
        }
      }

      // Generar ticket si hay productos exitosos
      if (successProducts.length > 0) {
        const ticket = new TicketModel({
          code: Math.random().toString(36).substring(2, 8).toUpperCase(),
          amount: totalAmount,
          purchaser: userEmail,
        });
        await ticket.save();
      }

      // Actualizar carrito
      cart.products = failedProducts;
      await cart.save();

      return {
        ticket: successProducts.length > 0,
        totalAmount,
        failedProducts,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const cartService = new CartService();
