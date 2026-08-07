import axiosClient from "./axiosClient";

const userApi = {

    getProfile(){

        return axiosClient.get(

            "/users/profile"

        );

    },

    updateProfile(data){

        return axiosClient.put(

            "/users/profile",

            data

        );

    },

    uploadAvatar(data){

        return axiosClient.post(

            "/users/avatar",

            data,

            {

                headers:{

                    "Content-Type":
                    "multipart/form-data"

                }

            }

        );

    }

};

export default userApi;