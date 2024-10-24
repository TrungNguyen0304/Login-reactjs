import { User } from '../models/user.js';

export const searchUsers = async (req, res) => {
    try {
        const { lastname } = req.query;

        // Dùng regex để tìm kiếm lastname chứa chuỗi
        const users = await User.find({ lastname: { $regex: lastname, $options: 'i' } });

        res.status(200).json(users);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm người dùng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};
