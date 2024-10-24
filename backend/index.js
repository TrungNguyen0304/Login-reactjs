import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { registerUser, loginUser, getUsers, deleteUser } from "./controllers/user.controller.js";
import { create } from "./controllers/create.js";
import { update } from "./controllers/update.js";
import { authenticateUser } from "./Middleware/authMiddleware.js";
import { searchUsers } from "./controllers/seach.js";

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
app.put('/api/users/:id', update); // Thêm route cho cập nhật người dùng
// app.get('/api/users/:id', getUserById);


// Xóa người dùng
app.delete('/api/users/:id', deleteUser); // ID người dùng sẽ được truyền qua params

// Lấy danh sách người dùng
app.get('/api/users', getUsers);

// Tìm kiếm người dùng
app.get('/api/users/search', searchUsers); 

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
