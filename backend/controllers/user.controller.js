import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'; // Để tạo token JWT


// Đăng ký người dùng mới
export const registerUser = async (req, res) => {
    const { civilite, lastname, firstname, email, password, maison, droitGroupe } = req.body;

    try {
        // Kiểm tra xem tất cả các trường có được cung cấp hay không
        if (!civilite || !lastname || !firstname || !email || !password || !maison || !droitGroupe) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Mã hóa mật khẩu trước khi lưu
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword); // Thêm log để kiểm tra

        const newUser = new User({
            civilite,
            lastname,
            firstname,
            email,
            password: hashedPassword,
            maison,
            droitGroupe
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Đăng nhập
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Kiểm tra mật khẩu
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Tạo token JWT
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Lưu token vào cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Phản hồi người dùng
        res.status(200).json({
            message: 'Login successful',
            redirectUrl: '/Home',
            user: { _id: user._id, fullname: user.fullname, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// show user
export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Lấy tất cả người dùng
        res.status(200).json(users); // Trả về danh sách người dùng
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// deleta

// Xóa người dùng theo ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Tìm người dùng theo ID và xóa
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};