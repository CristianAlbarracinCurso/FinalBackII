import { Router } from "express";
import { purchaseCart } from "../controllers/cartController.js";

const router = Router();
router.post("/:cid/purchase", purchaseCart);


export default router;
