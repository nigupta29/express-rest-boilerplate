import { Types } from "mongoose"

export {}

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: Types.ObjectId
        name: string
        email: string
        createdAt: NativeDate
        updatedAt: NativeDate
      }
    }
  }
}
