const express = require("express");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const connectDB = require("./Config/db");
const cors = require('cors')
const cookieParser = require('cookie-parser');
const session = require("express-session")
require('dotenv').config();

// สร้างแอปพลิเคชัน Express
const app = express();
// ตั้งค่า CORS
app.use(cors({
    origin: 'http://localhost:3000', // URL ของแอป React
    credentials: true // อนุญาตให้รับคุกกี้
}));
app.use(session({
    secret:'123',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:process.env.NODE_ENV === "production"}
}))

app.use(cookieParser());

// ใช้ morgan ในโหมด 'dev' สำหรับการล็อกข้อมูลการร้องขอ
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productRoutes = require('./Routes/product');
app.use('/api', productRoutes); // ตรวจสอบว่ามีการใช้ route อย่างถูกต้อง

// เรียกฟังก์ชันเพื่อเชื่อมต่อกับฐานข้อมูล MongoDB
connectDB();

// อ่านไฟล์ทั้งหมดในโฟลเดอร์ './Routes' และนำมาใช้เป็น route ของแอปพลิเคชัน
readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

// ตั้งค่าเซิร์ฟเวอร์ให้ฟังการร้องขอบนพอร์ต 5000 และแสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน
app.listen(5000, () => console.log("Start server on port:5000 owo"));
