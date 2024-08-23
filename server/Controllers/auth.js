const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new error("ไม่มีJWT_SECRET");
}

exports.registerUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: "ข้อมูลที่ส่งมาไม่ครบถ้วน" });
        }

        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, password: hashPassword });
        await newUser.save();

        res.status(201).json({ message: "สมัครสมาชิกสำเร็จ" });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการสมัครสมาชิก" });
    }
};
exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: "ข้อมูลที่ส่งมาไม่ครบถ้วน" });
        }

        const checkUser = await User.findOne({ userName });
        if (!checkUser) {
            return res.status(400).json({ message: "ไม่มีข้อมูลในระบบ" });
        }

        const isMatch = await bcrypt.compare(password, checkUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
        }

        const token = jwt.sign(
            { userId: checkUser._id, userName: checkUser.userName },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "เข้าสู่ระบบสำเร็จ",
            token: token // ส่ง token กลับไปยัง client
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
    }
};

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.header("Authorization")
    console.log('Authorization Header:', authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: "ไม่มีสิทธิ์เข้าถึง1" });
    }
    const token = authHeader.replace('Bearer ','').trim();
    if (!token) {
        return res.status(401).json({ message: "ไม่มีสิทธิ์เข้าถึง2" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        User.findById(decoded.userId).then((user) => {
            if (!user || user.token !== token) {
                return res
                    .status(401)
                    .json({ message: "Token ไม่ถูกต้องหรือหมดอายุแล้ว1" });
            }
            req.user = user;
            next();
        }).catch(err => {
            console.error('Error fetching user:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
    } catch (err) {
        return res.status(401).json({ message: "Token ไม่ถูกต้องหรือหมดอายุแล้ว2" });
    }
};
