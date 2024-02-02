import { Router } from "express"
import { createNote, getNotes } from "../controllers/notesControllers"
const router = Router()

router.route("/").get(getNotes).post(createNote)

export default router
