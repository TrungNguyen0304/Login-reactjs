import { User } from '../../models/user.js'; // Import mô hình User

export const searchUsers = async (req, res) => {
    try {
        const { firstname } = req.body; // Lấy firstname từ body

        // Kiểm tra xem firstname có được cung cấp không
        if (!firstname) {
            return res.status(400).json({ message: 'Vui lòng cung cấp firstname để tìm kiếm.' });
        }

        // Dùng regex để tìm kiếm firstname chứa chuỗi
        const users = await User.find({ firstname: { $regex: firstname, $options: 'i' } });

        // Kiểm tra nếu không tìm thấy người dùng
        if (users.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng nào.' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm người dùng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ', error });
    }
};
