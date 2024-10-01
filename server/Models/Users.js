const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userName: String,
        password: String,
        email: String,  // เพิ่มฟิลด์อีเมล
        role: String,
        resetPasswordToken: String,  // เพิ่มฟิลด์สำหรับเก็บโทเคนรีเซ็ตรหัสผ่าน
        resetPasswordExpires: Date,  // เพิ่มฟิลด์สำหรับเก็บเวลาหมดอายุของโทเคน
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
