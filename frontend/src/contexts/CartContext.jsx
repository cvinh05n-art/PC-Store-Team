import { 
    createContext, 
    useContext, 
    useState,
    useEffect
} from "react";


const CartContext = createContext();


export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(()=>{

    const savedCart = localStorage.getItem("cart");

    return savedCart 
        ? JSON.parse(savedCart)
        : [];

    });
    useEffect(()=>{

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    },[cart]);

    const addToCart = (product) => {

        const exist = cart.find(
            item => item.id === product.id
        );


        if(exist){

            setCart(
                cart.map(item =>
                    item.id === product.id
                    ?
                    {
                        ...item,
                        quantity:item.quantity + 1
                    }
                    :
                    item
                )
            );

        }
        else{

            setCart([
                ...cart,
                {
                    ...product,
                    quantity:1
                }
            ]);

        }

    };



    const removeFromCart = (id)=>{

        setCart(
            cart.filter(
                item => item.id !== id
            )
        );

    };



    const increaseQuantity=(id)=>{

        setCart(
            cart.map(item =>
                item.id === id
                ?
                {
                    ...item,
                    quantity:item.quantity+1
                }
                :
                item
            )
        );

    };



    const decreaseQuantity=(id)=>{

        setCart(
            cart.map(item =>
                item.id === id && item.quantity>1
                ?
                {
                    ...item,
                    quantity:item.quantity-1
                }
                :
                item
            )
        );

    };



    return (

        <CartContext.Provider

            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = ()=>useContext(CartContext);