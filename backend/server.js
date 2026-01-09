import express from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import bodyParser from "body-parser"
import cloudinary from "./cloudinaryConfig.js";
import 'dotenv/config'
import cors from "cors";

const app = express()
app.use(express.json())
app.use(express.text());
app.use(bodyParser.urlencoded({extended:true}))
const port = process.env.PORT

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const ConnectDb = async()=> {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
    dbName:'jconnect'
})
  console.log("DB connected")
  } catch (error) {
    console.log(error)
  }
}

await ConnectDb()

app.use("/users",userRoutes)
app.use("/posts",postRoutes)
app.use("/comments",commentRoutes)

app.listen(port,()=>{
  console.log(`listining at port ${port}`)
})
