import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from './database.js';
import AuthRouter from './routes/authRoutes.js'


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies and auth tokens
    allowedHeaders: "Content-Type,Authorization,Cache-Control",
  })
);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


const connectDatabase = async () => {
  try {
    connectDB();
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};


app.use(AuthRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(process.env.PORT || 3000, async () => {
    await connectDB();
    console.log("Server Started")
})