import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

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

        // Phản hồi người dùng
        res.status(200).json({
            message: 'Login successful',
            redirectUrl: '/Home', // Đường dẫn đến trang bạn muốn chuyển hướng
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

