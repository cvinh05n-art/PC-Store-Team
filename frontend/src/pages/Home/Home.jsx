import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import ProductCard from "../../components/product/ProductCard";
import "./Home.css";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAll();
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <h2>Đang tải sản phẩm...</h2>;
    }

    const filteredProducts = products.filter((product) => {
        const matchName = product.name
            .toLowerCase()
            .includes(keyword.toLowerCase());

        const matchCategory =
            category === "Tất cả" ||
            product.category === category;

        return matchName && matchCategory;
    });

    const categories = [
        "CPU",
        "GPU",
        "RAM",
        "Mainboard",
        "SSD"
    ];

    return (
        <div className="home">

            <h1>Linh kiện máy tính</h1>

            {/* THANH TÌM KIẾM */}
            <div className="toolbar">

                <input
                    type="text"
                    placeholder="🔍 Tìm sản phẩm..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Tất cả">
                        Tất cả
                    </option>

                    {categories.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>

            </div>

            {/* SẢN PHẨM THEO LOẠI */}

            {category === "Tất cả" ? (

                categories.map((item) => {

                    const categoryProducts = filteredProducts.filter(
                        (product) => product.category === item
                    );

                    if (categoryProducts.length === 0) {
                        return null;
                    }

                    return (
                        <section
                            className="category-section"
                            key={item}
                        >

                            <div className="category-header">
                                <h2>{item}</h2>
                            </div>

                            <div className="product-grid">

                                {categoryProducts.map((product) => (
                                    <ProductCard
                                        key={product.id || product._id}
                                        product={product}
                                    />
                                ))}

                            </div>

                        </section>
                    );
                })

            ) : (

                <section className="category-section">

                    <div className="category-header">
                        <h2>{category}</h2>
                    </div>

                    <div className="product-grid">

                        {filteredProducts.length > 0 ? (

                            filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id || product._id}
                                    product={product}
                                />
                            ))

                        ) : (

                            <p>
                                Không tìm thấy sản phẩm.
                            </p>

                        )}

                    </div>

                </section>

            )}

        </div>
    );
};

export default Home;