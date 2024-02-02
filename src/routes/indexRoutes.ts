import { Router } from "express"
import { protectRoute } from "../middlewares/authMiddlewares"
import authRoutes from "./authRoutes"
import userRoutes from "./userRoutes"

const router = Router()

router.use("/auth", authRoutes)
router.use("/user", protectRoute, userRoutes)

export default router
