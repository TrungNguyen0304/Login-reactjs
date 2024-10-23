// Middleware để xác thực người dùng
export const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;

    console.log('Token:', token); // Log token để kiểm tra

    if (!token) {
        console.log('No token, unauthorized'); // Log nếu không có token
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decoded); // Log thông tin giải mã
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Invalid token', error); // Log nếu token không hợp lệ
        return res.status(401).json({ message: 'Invalid token' });
    }
};
