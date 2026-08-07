import axiosClient from "./axiosClient";

const cartApi = {

    getCart() {

        return axiosClient.get("/cart");

    },

    addToCart(data) {

        return axiosClient.post("/cart", data);

    },

    updateQuantity(id, quantity) {

        return axiosClient.put(

            `/cart/${id}`,

            { quantity }

        );

    },

    removeItem(id) {

        return axiosClient.delete(

            `/cart/${id}`

        );

    },

    clearCart() {

        return axiosClient.delete("/cart");

    }

};

export default cartApi;