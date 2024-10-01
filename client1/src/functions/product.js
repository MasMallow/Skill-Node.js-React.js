import axios from "axios";

export const getData = async () => {
    return await axios.get(process.env.REACT_APP_API + "/product", {
        withCredentials: true,
    });
};

export const deleteData = async (id) => {
    return await axios.delete(process.env.REACT_APP_API + "/remove/" + id, {
        withCredentials: true,
    });
};

export const create = async (data) => {
    return await axios.post(process.env.REACT_APP_API + "/create", data, {
        withCredentials: true,
    });
};

export const read = async (id) => {
    return await axios.get(process.env.REACT_APP_API + "/read/" + id, {
        withCredentials: true,
    });
};

export const update = async (id, data) => {
    return await axios.put(process.env.REACT_APP_API + "/newUpdate/" + id, data, {
        withCredentials: true,
    });
};

export const register = async (form) => {
    return await axios.post(process.env.REACT_APP_API + "/register", form);
};

export const login = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API}/login`,
            data,
            { withCredentials: true } // รวมคุกกี้ในคำขอ
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

export const getUserData = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/user`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response) {
            throw new Error(
                error.response.data.message ||
                "An error occurred while fetching user data"
            );
        } else if (error.request) {
            throw new Error("Network error: Unable to reach the server");
        } else {
            throw new Error("Error: " + error.message);
        }
    }
};

export const searchData = async (term) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API}/search?term=${term}`,
        { withCredentials: true }
    );
    return response;
};