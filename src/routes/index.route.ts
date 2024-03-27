import { Router } from "express"
import { protectRoute } from "../middlewares/auth.middleware"
import authRoutes from "./auth.route"
import notesRoutes from "./notes.route"
import userRoutes from "./user.route"

const router = Router()

router.use("/auth", authRoutes)
router.use("/user", protectRoute, userRoutes)
router.use("/notes", protectRoute, notesRoutes)

export default router
