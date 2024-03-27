import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import User from "../models/user"
import generateToken from "../utils/generate-token"
import { hashPassword, matchPassword } from "../utils/helper-functions"

type RegisterBody = {
  email: string
  name: string
  password: string
}

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password }: RegisterBody = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error("User already exists")
    }

    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
    })

    if (user) {
      generateToken(res, user._id)

      res.status(201).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
  }
)

type LoginBody = {
  email: string
  password: string
}

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: LoginBody = req.body

  const user = await User.findOne({ email })

  if (user && (await matchPassword(password, user.password))) {
    generateToken(res, user._id)
    res
      .status(201)
      .json({ user: { _id: user._id, name: user.name, email: user.email } })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) })
  res.status(200).json({ message: "Logged out successfully" })
})
