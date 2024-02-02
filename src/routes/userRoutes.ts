import { Router } from "express"
import { getUserDetails } from "../controllers/userControllers"
const router = Router()

router.get("/details", getUserDetails)

export default router
