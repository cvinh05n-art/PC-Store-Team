import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback
} from "react";

import cartApi from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const fetchCart = useCallback(async (showLoading = true) => {

        if (showLoading) {
            setLoading(true);
        }

        try {

            const response = await cartApi.getCart();

            setCart(response.data || []);

        }
        catch (error) {

            console.error("Lỗi lấy giỏ hàng:", error);

        }
        finally {

            if (showLoading) {
                setLoading(false);
            }

        }

    }, []);

    useEffect(() => {

        fetchCart();

    }, [fetchCart]);

    const addToCart = useCallback(async (product, quantity = 1) => {

        setProcessing(true);

        try {

            await cartApi.addToCart({

                productId: product._id || product.id,

                quantity

            });

            await fetchCart(false);

        }
        catch (error) {

            console.error("Lỗi thêm sản phẩm:", error);
            throw error;

        }
        finally {

            setProcessing(false);

        }

    }, [fetchCart]);

    const removeFromCart = useCallback(async (id) => {

        setProcessing(true);

        try {

            await cartApi.removeItem(id);

            await fetchCart(false);

        }
        catch (error) {

            console.error("Lỗi xóa sản phẩm:", error);
            throw error;

        }
        finally {

            setProcessing(false);

        }

    }, [fetchCart]);

    const increaseQuantity = useCallback(async (id) => {

        const item = cart.find(item => item.id === id);

        if (!item) return;

        setProcessing(true);

        try {

            await cartApi.updateQuantity(

                id,

                item.quantity + 1

            );

            await fetchCart(false);

        }
        catch (error) {

            console.error("Lỗi cập nhật số lượng:", error);
            throw error;

        }
        finally {

            setProcessing(false);

        }

    }, [cart, fetchCart]);

    const decreaseQuantity = useCallback(async (id) => {

        const item = cart.find(item => item.id === id);

        if (!item) return;

        if (item.quantity <= 1) {

            await removeFromCart(id);

            return;

        }

        setProcessing(true);

        try {

            await cartApi.updateQuantity(

                id,

                item.quantity - 1

            );

            await fetchCart(false);

        }
        catch (error) {

            console.error("Lỗi cập nhật số lượng:", error);
            throw error;

        }
        finally {

            setProcessing(false);

        }

    }, [cart, fetchCart, removeFromCart]);

    const clearCart = useCallback(async () => {

        setProcessing(true);

        try {

            await cartApi.clearCart();

            setCart([]);

        }
        catch (error) {

            console.error("Lỗi xóa giỏ hàng:", error);
            throw error;

        }
        finally {

            setProcessing(false);

        }

    }, []);

    const totalPrice = useMemo(() => {

        return cart.reduce(

            (total, item) =>

                total + Number(item.price) * item.quantity,

            0

        );

    }, [cart]);

    const itemCount = useMemo(() => {

        return cart.reduce(

            (total, item) =>

                total + item.quantity,

            0

        );

    }, [cart]);

    return (

        <CartContext.Provider

            value={{

                cart,

                loading,

                processing,

                totalPrice,

                itemCount,

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