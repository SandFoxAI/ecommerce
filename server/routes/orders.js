import express from "express"
import { createOrder } from "../Controllers/orders.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/",createOrder)

export default router;