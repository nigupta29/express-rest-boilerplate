import { Router } from "express"
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authControllers"
import { protectRoute } from "../middlewares/authMiddlewares"
const router = Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/logout", protectRoute, logoutUser)

export default router
