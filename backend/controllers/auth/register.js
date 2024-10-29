
import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";


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
