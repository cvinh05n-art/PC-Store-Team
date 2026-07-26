import axios from "axios";


const API_URL = "http://localhost:5000/api/users/avatar";


export const uploadAvatar = async(file)=>{


    const formData = new FormData();


    formData.append(
        "avatar",
        file
    );


    const token = localStorage.getItem("token");



    const response = await axios.post(

        API_URL,

        formData,

        {
            headers:{

                Authorization:
                `Bearer ${token}`,

                "Content-Type":
                "multipart/form-data"

            }
        }

    );


    return response.data;

};