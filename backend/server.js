import express from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import 'dotenv/config'

const app = express()
app.use(express.json())
const port = process.env.PORT

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
