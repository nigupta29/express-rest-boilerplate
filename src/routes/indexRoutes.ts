import { Router } from "express"
import { protectRoute } from "../middlewares/authMiddlewares"
import authRoutes from "./authRoutes"
import userRoutes from "./userRoutes"
import notesRoutes from "./notesRoutes"

const router = Router()

router.use("/auth", authRoutes)
router.use("/user", protectRoute, userRoutes)
router.use("/notes", protectRoute, notesRoutes)

export default router
