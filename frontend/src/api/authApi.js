import axiosClient from "./axiosClient";

const authApi = {

    login(data){

        return axiosClient.post(

            "/auth/login",

            data

        );

    },

    register(data){

        return axiosClient.post(

            "/auth/register",

            data

        );

    },

    logout(){

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    }

};

export default authApi;