const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

exports.auth = async (req, res, next) => {
    try {
        // ดึงค่า Authorization header
        const authHeader = req.headers.authorization;

        // ตรวจสอบว่า authHeader มีค่าและเริ่มต้นด้วย 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Token missing or malformed" });
        }

        // ดึงค่า token ออกมาจาก authHeader
        const token = authHeader.replace('Bearer ', '').trim();

        // ตรวจสอบความถูกต้องของ token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // เก็บข้อมูลผู้ใช้ที่ decode ลงใน req.user

        // ไปยัง middleware ถัดไป
        next();
    } catch (err) {
        console.error('Authentication error:', err);
        res.status(401).json({ message: "Token invalid or expired" });
    }
};
