import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read, update } from "../functions/product";

export const FromEditProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        detail: "",
        price: "",
    });

    console.log(params.id);
    useEffect(() => {
        loadData(params.id);
    }, [params.id]);

    const loadData = async (id) => {
        read(id)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (nameInput) => {
        setData({
            ...data,
            [nameInput.target.name]: nameInput.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // แก้ไขจาก data.preventDefault() เป็น e.preventDefault()
        update(params.id, data)
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            FromEditProduct
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={(nameInput) => handleChange(nameInput)}
                    placeholder="name"
                    value={data.name}
                />
                <br />
                <input
                    type="text"
                    name="detail"
                    onChange={(nameInput) => handleChange(nameInput)}
                    placeholder="detail"
                    value={data.detail}
                />
                <br />
                <input
                    type="text"
                    name="price"
                    onChange={(nameInput) => handleChange(nameInput)}
                    placeholder="price"
                    value={data.price}
                />
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default FromEditProduct;
