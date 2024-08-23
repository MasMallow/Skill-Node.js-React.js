import React, { useState, useEffect } from "react";
import { deleteData,create,getData } from "../functions/product";
import { Link,useNavigate } from "react-router-dom";

export const Fromproduct = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        getData()
        .then((res)=>setData(res.data))
        .catch((err)=> console.log(err))
    };
    const handleChange = (nameInput) => {
        setForm({
            ...form,
            [nameInput.target.name]: nameInput.target.value
        })
    };

    const handleDelete = async (id)=>{
        deleteData(id)
        .then(res =>{
            console.log(res)
            loadData()
        })
        .catch((err)=>console.log(err))
    }

    const handleSubmit = async (data) => {
        data.preventDefault()
        create(form)
            .then(res => {
                loadData()
            })
            .catch((err) => console.log(err))
    }
    const handlesignOut = async()=>{
        localStorage.removeItem("token")
        navigate("/");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={(nameInput) => handleChange(nameInput)}
                    placeholder="name"
                />
                <br />
                <input type="text" name="detail" onChange={(nameInput) => handleChange(nameInput)} placeholder="detail" />
                <br />
                <input type="text" name="price" onChange={(nameInput) => handleChange(nameInput)} placeholder="price" />
                <br />
                <button>Submit</button>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">detail</th>
                        <th scope="col">price</th>
                        <th scope="col">action</th>
                        <th scope="col">Change</th>
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
                                <td onClick={()=>handleDelete(item._id)}>Delete</td>
                                <td>
                                    <Link to = {'/edit/' + item._id}>
                                    edit
                                    </Link>
                                </td>
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
                <button onClick={handlesignOut}>Sign-Out</button>
            </div>
        </div>
    );
};
