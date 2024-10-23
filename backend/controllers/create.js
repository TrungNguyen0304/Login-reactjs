import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';

export const create = async (req, res) => {
    try {
        const { civilite, lastname, firstname, email, maison, droitGroupe, password } = req.body;

        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({
            civilite,
            lastname,
            firstname,
            email,
            maison,
            droitGroupe,
            password: hashedPassword,
        });

        // Lưu người dùng vào cơ sở dữ liệu
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};