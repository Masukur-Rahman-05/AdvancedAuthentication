import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from './database.js';
import AuthRouter from './routes/authRoutes.js'


const app = express();

const corsConfig = {
  origin: process.env.CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and auth tokens
  allowedHeaders: [
    "Content-Type",
    "Cache-Control",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
};

app.use(cors(corsConfig));
app.options("", cors(corsConfig));

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Allow cookies and auth tokens
//     allowedHeaders: "Content-Type,Authorization,Cache-Control",
//   })
// );
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

connectDatabase();


app.use(AuthRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(process.env.PORT || 3000, async () => {
    await connectDB();
    console.log("Server Started")
})