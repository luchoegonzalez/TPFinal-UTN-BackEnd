import { Router } from "express"
import { createProduct, getProductByName, deleteProduct, getAllProducts, updateProduct } from "../controllers/productControllers"
import { authMiddleware } from "../middleware/authMiddleware"

const productRouter = Router()

productRouter.get("/", getAllProducts)
productRouter.get("/:name", getProductByName)
productRouter.post("/", authMiddleware, createProduct)
productRouter.delete("/:id", authMiddleware, deleteProduct)
productRouter.patch("/:id", authMiddleware, updateProduct)

export { productRouter }