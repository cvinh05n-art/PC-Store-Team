import "./BrandView.css";

const brands = [
    {
        id: 1,
        name: "Intel"
    },
    {
        id: 2,
        name: "AMD"
    },
    {
        id: 3,
        name: "NVIDIA"
    },
    {
        id: 4,
        name: "ASUS"
    }
];

const BrandView = () => {

    return (
        <div className="brand-view">

            <div className="brand-view-header">

                <p className="brand-eyebrow">
                    PC STORE
                </p>

                <h1>
                    Thương hiệu
                </h1>

                <p>
                    Khám phá các thương hiệu linh kiện
                    đang được bán tại PC Store.
                </p>

            </div>

            <div className="brand-grid">

                {brands.map((brand) => (

                    <div
                        className="brand-card"
                        key={brand.id}
                    >

                        <div className="brand-logo">
                            {brand.name.charAt(0)}
                        </div>

                        <h3>
                            {brand.name}
                        </h3>

                        <span>
                            Xem sản phẩm
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default BrandView;