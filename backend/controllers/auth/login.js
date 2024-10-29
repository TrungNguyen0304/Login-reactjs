import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'; // Để tạo token JWT

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

        // Cập nhật thời gian đăng nhập cuối cùng
        user.lastConnection = Date.now();
        await user.save(); // Lưu thay đổi vào cơ sở dữ liệu

        // Tạo token JWT
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Lưu token vào cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Phản hồi người dùng
        res.status(200).json({
            message: 'Login successful',
            redirectUrl: '/Home',
            user: { _id: user._id, fullname: `${user.firstname} ${user.lastname}`, email: user.email } // Thêm fullname
        });
    } catch (error) {
        console.error(error); // In ra lỗi để dễ dàng gỡ lỗi
        res.status(500).json({ message: 'Server error' });
    }
};
