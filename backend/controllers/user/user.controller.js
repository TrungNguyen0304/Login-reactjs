import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";
//thêm người dùng 
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

// show user
export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Lấy tất cả người dùng
        res.status(200).json(users); // Trả về danh sách người dùng
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

// get id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Tìm người dùng theo ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// update
export const update = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID người dùng từ tham số URL
        const { civilite, lastname, firstname, email, maison, droitGroupe, password } = req.body;

        // Tìm người dùng theo ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Cập nhật thông tin người dùng nếu có
        user.civilite = civilite !== undefined ? civilite : user.civilite;
        user.lastname = lastname !== undefined ? lastname : user.lastname;
        user.firstname = firstname !== undefined ? firstname : user.firstname;
        user.email = email !== undefined ? email : user.email;
        user.maison = maison !== undefined ? maison : user.maison;
        user.droitGroupe = droitGroupe !== undefined ? droitGroupe : user.droitGroupe;

        // Nếu mật khẩu mới được cung cấp, mã hóa và cập nhật
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Lưu người dùng đã cập nhật vào cơ sở dữ liệu
        const updatedUser = await user.save();

        // Không trả về mật khẩu
        const { password: _, ...userWithoutPassword } = updatedUser.toObject();

        return res.status(200).json({ message: 'User updated successfully', user: userWithoutPassword });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
