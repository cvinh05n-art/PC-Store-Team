import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
    return (
        <div className="banner">
            <div className="banner-content">
                <h1>
                    Linh kiện máy tính chính hãng
                </h1>
                <p>
                    CPU • VGA • RAM • SSD • Mainboard
                </p>
                <p className="sub-text">
                    Nâng cấp PC - Gaming - Workstation
                    với sản phẩm chất lượng cao
                </p>
                <Link to="/">
                    <button>
                        Mua ngay
                    </button>
                </Link>
            </div>
            <div className="banner-image">
                <img
                    src="https://via.placeholder.com/500x300"
                    alt="PC Gaming"
                />
            </div>
        </div>
    );
};

export default Banner;