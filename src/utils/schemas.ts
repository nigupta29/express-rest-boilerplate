import { z } from "zod"

export const userSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Min. of 6 characters are required for password" }),
  createdAt: z
    .string()
    .datetime({ message: "createdAt must be a valid datetime string" }),
  updatedAt: z
    .string()
    .datetime({ message: "updatedAt must be a valid datetime string" }),
})

export const loginSchema = userSchema.pick({ email: true, password: true })

export const registerSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
})
