import express from "express"
import { getItems, getItem } from "../Controllers/items.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/",getItems)
router.get("/:id",getItem)

export default router;