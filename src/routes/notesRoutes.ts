import { Router } from "express"
import { createNote, getNote, getNotes } from "../controllers/notesControllers"
import { checkNoteAccess } from "../middlewares/authMiddlewares"
const router = Router()

router.param("id", checkNoteAccess)
router.route("/").get(getNotes).post(createNote)
router.route("/:id").get(getNote)

export default router
