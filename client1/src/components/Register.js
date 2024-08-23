import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { register } from "../functions/product";

export const Register = () => {
    const [form, setForm] = useState({
        userName: '',
        password: ''
    });

    // const navigate = useNavigate();

    const handleChange = (nameInput) => {
        setForm({
            ...form,
            [nameInput.target.name]: nameInput.target.value,
        });
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            alert('สมัครสมาชิกสำเร็จแล้ว');
            
            // ล้างช่อง input หลังจากสมัครเสร็จ
            setForm({
                userName: '',
                password: ''
            });

            // นำทางไปยังหน้าอื่นหลังจากสมัครสมาชิกเสร็จ บรรทัดที่ 11
            // navigate('/')
        } catch (err) {
            alert('เกิดข้อผิดพลาดในการสมัครสมาชิก: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div>
            <label>Register</label>
            <form className="" onSubmit={registerSubmit}>
                <div>
                    <label>User</label>
                    <input
                        placeholder="ชื่อผู้ใช้"
                        name="userName"
                        type="text"
                        value={form.userName}  // ใช้ค่าในสถานะ
                        onChange={(nameInput) => handleChange(nameInput)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        placeholder="รหัสผ่าน"
                        name="password"
                        type="password"
                        value={form.password}  // ใช้ค่าในสถานะ
                        onChange={(nameInput) => handleChange(nameInput)}
                    />
                </div>
                <button type="submit">สมัครสมาชิก</button>
            </form>
            <button><a href="/">กลับหน้าหลัก</a></button>
        </div>
    );
};

export default Register;
