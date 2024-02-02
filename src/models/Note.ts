import { InferSchemaType, Schema, Types, model } from "mongoose"

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      default: "",
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
)

type INote = InferSchemaType<typeof noteSchema>

const Note = model<INote>("notes", noteSchema)

export default Note
