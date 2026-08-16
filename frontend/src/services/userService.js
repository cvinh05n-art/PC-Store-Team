import axios from "axios";

const API_URL = "http://localhost:5000/api/users";
export const updateProfile = async (data) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
        `${API_URL}/profile`,
        data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
    return response.data;
};