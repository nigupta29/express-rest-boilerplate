import { connect } from "mongoose"
import { getEnvValue } from "../utils/helperFunctions"

const connectDB = async (): Promise<void> => {
  try {
    const mongoUrl = getEnvValue("MONGO_URL")

    const conn = await connect(mongoUrl)
    console.dir(`Database connected at host : ${conn.connection.host}`)
  } catch (error: any) {
    console.error(error.message)
    process.exit(1)
  }
}

export default connectDB
