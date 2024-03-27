import { Request, Response } from "express"
import asyncHandler from "express-async-handler"

export const getUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ user: req.user })
  }
)
