import express from "express"
import { createServer } from "node:http"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"
import { ChatModel } from "./models/chat.model.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cloudinary from "./cloudinaryConfig.js"
import "dotenv/config"
import cors from "cors"
import { Server } from "socket.io"

const app = express()
const server = createServer(app)
app.use(express.json())
app.use(express.text())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5174","http://localhost:5173"],
    credentials: true
  },
  connectionStateRecovery: {}
})

app.use(cors({
  origin: ["http://localhost:5174","http://localhost:5173"],
  credentials: true
}))

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "jconnect"
    })
    console.log("DB connected")
  } catch (error) {
    console.log(error)
  }
}

await ConnectDb()

io.on("connection", (socket) => {
  console.log("user connected")
  socket.on("chat message", async (msg) => {
    io.emit("chat message", msg)
    await ChatModel.create(msg)
  })
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
})

app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)
app.use("/notifications", notificationRoutes)
app.use("/auth", authRoutes)
app.use("/chats", chatRoutes)
app.use("/rooms", roomRoutes)

server.listen(port, () => {
  console.log(`listining at port ${port}`)
})
