import { Response } from "express"
import jwt from "jsonwebtoken"
import { Types } from "mongoose"
import { getEnvValue } from "./helper-functions"

const generateToken = (res: Response, userId: Types.ObjectId) => {
  const token = jwt.sign({ userId }, getEnvValue("JWT_SECRET_KEY"), {
    expiresIn: "1d",
  })

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== `development`,
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  })
}

export default generateToken
