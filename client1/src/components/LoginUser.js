import React, { useState } from "react";
import { login } from "../functions/product";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, MobileStepper, Grid } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import "../css/Login.css";
import CustomGridCarousel from "./ImageSlder";

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
            localStorage.setItem("userName", result.userName);
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
    const register = async () => {
        navigate("/register")
    }

    return (
        <div className="Page-Login">
            <Box sx={{ height: "100vh" }}>
                <Grid2 container>
                    <Grid2
                        size={6}
                        sx={{
                            height: "100vh",
                            display: "flex",
                            backgroundColor: "#ffafcc",
                            flexDirection: "column",
                        }}>
                            <CustomGridCarousel />
                    </Grid2>

                    <Grid2
                        size={6}
                        sx={{
                            height: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#ffffff",
                        }}
                    >
                        <form onSubmit={handleSubmit} className="From-Login">
                            <Grid2 container>
                                <span className="Login-Text">Login</span>
                                <TextField
                                    className="Text-Field"
                                    fullWidth
                                    size="small"
                                    label="User"
                                    variant="filled"
                                    name="userName"
                                    value={userName}
                                    placeholder="ชื่อผู้ใช้"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Grid2>

                            <Grid2 container >
                                <TextField
                                    className="Text-Field"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    name="password"
                                    size="small"
                                    variant="filled"
                                    value={password}
                                    placeholder="รหัสผ่าน"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid2>

                            <Grid2 container>
                                <Button
                                    className="Text-Field"
                                    variant="contained"
                                    type="submit"
                                    disabled={loading}
                                    fullWidth
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </Button>
                            </Grid2>
                            <Grid2 container justifyContent="center">
                                <Button className="Text-Field" variant="contained" color="success" onClick={register} fullWidth>Register</Button>
                            </Grid2>
                        </form>
                        {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}
                    </Grid2>

                </Grid2>
            </Box>
        </div >
    );
};

export default LoginUser;
