import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import cartApi from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchCart();

    }, []);

    const fetchCart = async () => {

        try {

            const response = await cartApi.getCart();

            setCart(response.data);

        }
        catch (error) {

            console.log("Lỗi lấy giỏ hàng:", error);

        }
        finally {

            setLoading(false);

        }

    };

    const addToCart = async (product, quantity = 1) => {

        try {

            await cartApi.addToCart({

                productId: product.id,

                quantity

            });

            await fetchCart();

        }
        catch (error) {

            console.log("Lỗi thêm sản phẩm:", error);

        }

    };

    const removeFromCart = async (id) => {

        try {

            await cartApi.removeItem(id);

            await fetchCart();

        }
        catch (error) {

            console.log("Lỗi xóa sản phẩm:", error);

        }

    };

    const increaseQuantity = async (id) => {

        const item = cart.find(item => item.id === id);

        if (!item) return;

        try {

            await cartApi.updateQuantity(

                id,

                item.quantity + 1

            );

            await fetchCart();

        }
        catch (error) {

            console.log("Lỗi cập nhật số lượng:", error);

        }

    };

    const decreaseQuantity = async (id) => {

        const item = cart.find(item => item.id === id);

        if (!item) return;

        if (item.quantity <= 1) {

            removeFromCart(id);

            return;

        }

        try {

            await cartApi.updateQuantity(

                id,

                item.quantity - 1

            );

            await fetchCart();

        }
        catch (error) {

            console.log("Lỗi cập nhật số lượng:", error);

        }

    };

    const clearCart = async () => {

        try {

            await cartApi.clearCart();

            setCart([]);

        }
        catch (error) {

            console.log("Lỗi xóa giỏ hàng:", error);

        }

    };

    const totalPrice = cart.reduce(

        (total, item) =>

            total + Number(item.price) * item.quantity,

        0

    );

    return (

        <CartContext.Provider

            value={{

                cart,

                loading,

                totalPrice,

                addToCart,

                removeFromCart,

                increaseQuantity,

                decreaseQuantity,

                clearCart,

                fetchCart

            }}

        >

            {children}

        </CartContext.Provider>

    );

};

export const useCart = () => useContext(CartContext);