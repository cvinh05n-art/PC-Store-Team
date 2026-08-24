import axiosClient from "./axiosClient";

const orderApi = {

    getMyOrders(){

        return axiosClient.get(

            "/orders/my-orders"

        );

    },

    create(data){

        return axiosClient.post(

            "/orders",

            data

        );

    },

    updateStatus(id,status){

        return axiosClient.patch(

            `/orders/${id}/status`,

            {
                orderStatus: status
            }

        );

    },


    getAll(){

    return axiosClient.get(

        "/orders"

    );

    }
    
};

export default orderApi;