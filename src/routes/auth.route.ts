import { Router } from "express"
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller"
import { protectRoute } from "../middlewares/auth.middleware"
const router = Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/logout", protectRoute, logoutUser)

export default router
