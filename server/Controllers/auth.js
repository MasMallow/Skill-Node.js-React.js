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
        const role = "User";

        if (!userName || !password) {
            return res.status(400).json({ message: "ข้อมูลที่ส่งมาไม่ครบถ้วน" });
        }

        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, password: hashPassword, role });
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

        req.session.user = {
            userId: checkUser._id,
            userName: checkUser.userName,
            role: checkUser.role
        };

        const token = jwt.sign(
            { userId: checkUser._id, userName: checkUser.userName },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        res.status(200).json({
            message: "เข้าสู่ระบบสำเร็จ"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
    }
};

exports.checkAuth = (req, res) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ isAuthenticated: true });
    } catch (err) {
        res.status(401).json({ isAuthenticated: false });
    }
};

exports.getUserFromToken = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId); // ใช้ userId จาก token
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            userName: user.userName, // ส่งกลับ userName
            role: user.role 
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = user;
        next();
    });
};