import React, { useState, useEffect, useCallback } from "react";
import {
    deleteData,
    create,
    getData,
    getUserData,
    searchData
} from "../functions/product";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert, TextField } from "@mui/material";
import "../css/Fromproduct.css";

export const Fromproduct = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();

    const handleSearch = useCallback(async () => {
        console.log("Searching for:", searchTerm);
        if (searchTerm) {
            try {
                const result = await searchData(searchTerm);
                setData(result.data);
                setAlertMessage("Search completed successfully.");
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                }, 3000); // Hide alert after 3 seconds
            } catch (err) {
                console.log("Error:", err);
                setAlertMessage("Error occurred while searching.");
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                }, 3000); // Hide alert after 3 seconds
            }
        } else {
            // loadData();
        }
    }, [searchTerm]); // เพิ่ม searchTerm เป็น dependency

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getUserData();
                setUserName(result.userName);
                setUserRole(result.role);
            } catch (err) {
                console.log("Error fetching user data:", err);
            }
        };
        fetchUserData();
        loadData();
    }, []);

    const loadData = async () => {
        getData()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    };

    const handleChange = (nameInput) => {
        setForm({
            ...form,
            [nameInput.target.name]: nameInput.target.value,
        });
    };

    const handleDelete = async (id) => {
        if (userRole !== "Admin") {
            alert("คุณไม่มีสิทธิ์ลบข้อมูล");
            return;
        }
        if (window.confirm("พร้อมที่จะลบข้อมูลแล้วใช่มั้ย?")) {
            deleteData(id)
                .then((res) => {
                    console.log(res);
                    loadData();
                    setAlertMessage("Data deleted successfully.");
                    setAlertVisible(true);
                    setTimeout(() => {
                        setAlertVisible(false);
                    }, 3000);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userRole !== "Admin") {
            alert("คุณไม่มีสิทธิ์เพิ่มข้อมูล");
            return;
        }
        try {
            await create({ ...form, addedBy: userName });
            loadData();
            setAlertMessage("Data added successfully.");
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
            e.target.reset();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearchChange = (e) => {
        console.log("Search term changed:", e.target.value); // เพิ่ม log นี้
        setSearchTerm(e.target.value); // ตั้งค่า searchTerm จาก input
    };

    const handlesignOut = async () => {
        navigate("/");
    };

    return (
        <div>
            {alertVisible && (
                <Alert severity="success" className="fixed-alert">
                    {alertMessage}
                </Alert>
            )}
            <h2>Welcome {userName}</h2>
            <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
            {userRole === "Admin" && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        onChange={(nameInput) => handleChange(nameInput)}
                        placeholder="name"
                    />
                    <br />
                    <input
                        type="text"
                        name="detail"
                        onChange={(nameInput) => handleChange(nameInput)}
                        placeholder="detail"
                    />
                    <br />
                    <input
                        type="text"
                        name="price"
                        onChange={(nameInput) => handleChange(nameInput)}
                        placeholder="price"
                    />
                    <br />
                    <Button variant="contained" color="success" type="submit">
                        Submit
                    </Button>
                </form>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">detail</th>
                        <th scope="col">price</th>
                        {userRole === "Admin" && (
                            <>
                                <th scope="col">action</th>
                                <th scope="col">Change</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <th scope="row">{item.name}</th>
                                <td>{item.detail || "N/A"}</td>
                                <td>{item.price || "N/A"}</td>
                                {userRole === "Admin" && (
                                    <>
                                        <td>
                                            <Button
                                                variant="text"
                                                color="primary"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                        <td>
                                            <Link to={"/edit/" + item._id}>edit</Link>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="sign_out">
                <Button variant="contained" color="error" onClick={handlesignOut}>
                    Sign-Out
                </Button>
            </div>
        </div>
    );
};
