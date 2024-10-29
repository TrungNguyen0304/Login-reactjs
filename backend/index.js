import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { getUsers, deleteUser,getUserById, create,update } from "./controllers/user/user.controller.js";

import { authenticateUser } from "./Middleware/authMiddleware.js";
import { searchUsers } from "./controllers/user/seach.js";
import {loginUser} from "./controllers/auth/login.js"
import { registerUser } from "./controllers/auth/register.js";
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

// Tạo người dùng mới
app.post('/api/create', create);

// Cập nhật thông tin người dùng
app.put('/api/users/:id', update); 
// get user id 
app.get('/api/users/:id', getUserById);

// Tìm kiếm người dùng
app.post('/api/users/search', searchUsers);

// Xóa người dùng
app.delete('/api/users/:id', deleteUser); // ID người dùng sẽ được truyền qua params

// Lấy danh sách người dùng
app.get('/api/users', getUsers);


// Route bảo vệ trang Home
app.get('/Home', authenticateUser, (req, res) => {
    res.status(200).json({ message: 'Welcome to the Home page!', user: req.user });
});

// Kết nối đến MongoDB và khởi động server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection failed:', err);
});
