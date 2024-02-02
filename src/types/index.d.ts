export {}

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string
        name: string
        email: string
        createdAt: NativeDate
        updatedAt: NativeDate
      }
    }
  }
}
