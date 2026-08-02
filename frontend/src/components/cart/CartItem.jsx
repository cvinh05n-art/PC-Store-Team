import "./CartItem.css";

const CartItem = ({
    item,
    onIncrease,
    onDecrease,
    onRemove
}) => {

    return (

        <div className="cart-item">

            <img

                src={item.image}

                alt={item.name}

            />

            <div className="cart-info">

                <h3>
                    {item.name}
                </h3>

                <p>
                    Giá:
                    {" "}
                    {item.price.toLocaleString()} đ
                </p>

                <div className="quantity">

                    <button

                        onClick={() =>
                            onDecrease(item.id)
                        }

                    >
                        -
                    </button>

                    <span>

                        {item.quantity}

                    </span>

                    <button

                        onClick={() =>
                            onIncrease(item.id)
                        }

                    >

                        +

                    </button>

                </div>

            </div>

            <button

                className="remove-btn"

                onClick={() =>
                    onRemove(item.id)
                }

            >

                Xóa

            </button>

        </div>

    );

};


export default CartItem;