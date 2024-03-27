import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import { Types } from "mongoose"
import Note from "../models/note"
import User from "../models/user"
import { getEnvValue } from "../utils/helper-functions"

type TDecodedObject = jwt.JwtPayload & {
  userId: string
}

export const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.cookies.jwt

    if (token) {
      try {
        const decodedObject = jwt.verify(
          token,
          getEnvValue("JWT_SECRET_KEY")
        ) as TDecodedObject

        req.user = await User.findById(decodedObject.userId).select(
          "-password -__v"
        )
        next()
      } catch (error) {
        res.status(401)
        throw new Error("Not authorized, invalid token")
      }
    } else {
      res.status(401)
      throw new Error("Not authorized, no token")
    }
  }
)

export const checkNoteAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
  noteId: string
) => {
  try {
    const note = await Note.findById(noteId)
    const currentUserId = req.user._id

    if (note && currentUserId.equals(note.userId as Types.ObjectId)) {
      next()
    } else {
      res.status(404)
      throw new Error("Resource not found")
    }
  } catch (error) {
    next(error)
  }
}
