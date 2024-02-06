import { Router } from "express"
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
} from "../controllers/notesControllers"
import { checkNoteAccess } from "../middlewares/authMiddlewares"
const router = Router()

router.route("/").get(getNotes).post(createNote)

router.param("id", checkNoteAccess)
router.route("/:id").get(getNote).delete(deleteNote)

export default router
