const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']; // ใช้ req.headers['authorization'] เพื่อเข้าถึง header
        if (!authHeader) {
            return res.status(401).json({ message: "ไม่มีสิทธิ์เข้าถึง3" });
        }
        const token = authHeader.replace('Bearer ', '').trim();
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Token Invalid" });
    }
};
