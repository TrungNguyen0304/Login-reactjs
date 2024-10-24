import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';

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

// export const getUserById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(200).json({ user });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Server error' });
//     }
// };


