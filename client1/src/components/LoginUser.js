import React, { useState } from "react";
import { login } from "../functions/product";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LoginUser = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); // สำหรับการจัดการสถานะการโหลด
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const result = await login({ userName, password });
            console.log("Login successful:", result);
            // การล็อกอินสำเร็จจะจัดการด้วยการตั้งค่า cookie จากเซิร์ฟเวอร์
            // ไม่มีการจัดเก็บ token ใน localStorage
            navigate("/menu"); // ไปที่หน้า /menu หลังจากล็อกอินสำเร็จ
        } catch (err) {
            console.log(err);
            setErrorMessage(
                "ล็อกอินไม่สำเร็จ: " + (err.message || "กรุณาลองอีกครั้ง")
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button>Button</Button>
            <form onSubmit={handleSubmit}>
                <div className="User">
                    <label>User</label>
                    <input
                        name="userName"
                        type="text"
                        value={userName}
                        placeholder="ชื่อผู้ใช้"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="Password">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="รหัสผ่าน"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <a href="/register">สมัครสมาชิก</a>
        </div>
    );
};

export default LoginUser;
