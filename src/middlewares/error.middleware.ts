import { NextFunction, Request, Response } from "express"
import { Error } from "mongoose"
import { ZodError } from "zod"

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

interface CustomError extends Error {
  name: string
  kind?: string
}

function formatZodError(error: ZodError): string {
  return error.errors.map((err) => err.message).join("\n")
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode
  let message: string = err.message

  if (err instanceof Error.CastError) {
    statusCode = 404
    message = "Resource not found"
  }

  if (err instanceof ZodError) {
    statusCode = 400
    message = formatZodError(err)
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
}
