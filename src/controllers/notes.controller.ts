import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Note from "../models/note"

type TNotePostBody = {
  title: string
  content?: string
}

export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content }: TNotePostBody = req.body

  const userId = req.user._id
  const note = await Note.create({ title, content, userId })
  res.status(201).json({
    note: {
      _id: note._id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    },
  })
})

export const getNotes = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id
  const notes = await Note.find({ userId }).select("-__v -userId")

  res.status(200).json({
    notes,
  })
})

export const getNote = asyncHandler(async (req: Request, res: Response) => {
  const noteId = req.params.id
  const note = await Note.findById(noteId).select("-__v -userId")

  res.status(200).json({
    note,
  })
})

export const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const noteId = req.params.id
  const note = await Note.findByIdAndUpdate(noteId, req.body as TNotePostBody, {
    new: true,
    runValidators: true,
  }).select("-__v -userId")

  res.status(200).json({
    note,
  })
})

export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const noteId = req.params.id
  await Note.findByIdAndDelete(noteId)

  res.status(204).json({
    message: "Note deleted succesfully",
  })
})
