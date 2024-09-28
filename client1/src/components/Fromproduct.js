import React, { useState, useEffect } from "react";
import { deleteData, create, getData, getUserData } from "../functions/product";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert } from "@mui/material";
import "../css/Fromproduct.css";

export const Fromproduct = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

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
            e.target.reset();
        } catch (err) {
            console.log(err);
        }
    };

    const handlesignOut = async () => {
        navigate("/");
    };

    return (
        <div>
            {alertVisible && (
                <Alert severity="success" className="fixed-alert">
                    This is a success Alert.
                </Alert>
            )}
            <h2>Welcome {userName}</h2>
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
