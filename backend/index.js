import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { registerUser, loginUser } from "./controllers/user.controller.js"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Đăng ký người dùng mới
app.post('/api/register', registerUser);

// Đăng nhập
app.post('/api/login', loginUser);

// Kết nối đến MongoDB và khởi động server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
