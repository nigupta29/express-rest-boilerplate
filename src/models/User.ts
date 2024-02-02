import { InferSchemaType, Schema, model } from "mongoose"

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)

type IUser = InferSchemaType<typeof userSchema>

const User = model<IUser>("users", userSchema)

export default User
