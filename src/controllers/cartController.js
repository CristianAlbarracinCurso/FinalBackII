import { cartService } from "../services/cartService.js";

export const purchaseCart = async (req, res) => {
  const { cid } = req.params;
  const userEmail = req.user.email; // Suponiendo que el usuario ya está autenticado

  try {
    const result = await cartService.purchaseById(cid, userEmail);
    if (result.ticket) {
      res.status(200).json({
        message: "Purchase completed successfully",
        totalAmount: result.totalAmount,
      });
    } else {
      res.status(400).json({
        message: "No products were purchased due to stock issues",
        failedProducts: result.failedProducts,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
