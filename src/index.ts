import cookieParser from "cookie-parser"
import { config } from "dotenv"
import express from "express"
import morgan from "morgan"
import connectDB from "./config/db"
import { errorHandler, notFound } from "./middlewares/error.middleware"
import indexRoutes from "./routes/index.route"
import { getEnvValue } from "./utils/helper-functions"

// Configuration
config()
connectDB()
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
if (getEnvValue("NODE_ENV") === "development") {
  app.use(morgan("dev"))
}

// Routes
app.use("/api/v1", indexRoutes)

// Global Error Handlers
app.use(notFound)
app.use(errorHandler)

// Server Start Point
const port = getEnvValue("PORT")
app.listen(port, () => console.log(`Server Started at port : ${port}`))
