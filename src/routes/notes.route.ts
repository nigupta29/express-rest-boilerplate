import { Router } from "express"
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/notes.controller"
import { checkNoteAccess } from "../middlewares/auth.middleware"
const router = Router()

router.route("/").get(getNotes).post(createNote)

router.param("id", checkNoteAccess)
router.route("/:id").get(getNote).patch(updateNote).delete(deleteNote)

export default router
