import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/User"
import { getEnvValue } from "../utils/helperFunctions"

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
