const express = require("express");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const connectDB = require("./Config/db");
const cors = require('cors')
require('dotenv').config();

// สร้างแอปพลิเคชัน Express
const app = express();
app.use (cors());

// ใช้ morgan ในโหมด 'dev' สำหรับการล็อกข้อมูลการร้องขอ
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// เรียกฟังก์ชันเพื่อเชื่อมต่อกับฐานข้อมูล MongoDB
connectDB();

// อ่านไฟล์ทั้งหมดในโฟลเดอร์ './Routes' และนำมาใช้เป็น route ของแอปพลิเคชัน
readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

// ตั้งค่าเซิร์ฟเวอร์ให้ฟังการร้องขอบนพอร์ต 5000 และแสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน
app.listen(5000, () => console.log("Start server on port:5000 owo"));
