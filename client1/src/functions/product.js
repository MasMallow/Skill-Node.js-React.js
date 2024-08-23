import axios from "axios";

export const getData = async () => {
    return await axios.get(process.env.REACT_APP_API + "/product", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const deleteData = async (id) => {
    await axios.delete(process.env.REACT_APP_API + "/product/" + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const create = async (data) => {
    await axios.post(process.env.REACT_APP_API + "/product", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const read = async (id) => {
    return await axios.get(process.env.REACT_APP_API + "/product/" + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const update = async (id, data) => {
    return await axios.put(process.env.REACT_APP_API + "/product/" + id, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const register = async (form) => {
    await axios.post(process.env.REACT_APP_API + "/register", form);
};

export const login = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API}/login`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        if (error.response) {
            throw new Error(
                error.response.data.message || "An error occurred during login"
            );
        } else if (error.request) {
            throw new Error("Network error: Unable to reach the server");
        } else {
            throw new Error("Error: " + error.message);
        }
    }
};
