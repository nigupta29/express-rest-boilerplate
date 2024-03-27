import { Router } from "express"
import { getUserDetails } from "../controllers/user.controller"
const router = Router()

router.get("/details", getUserDetails)

export default router
