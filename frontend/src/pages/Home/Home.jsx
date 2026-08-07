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
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    if (loading) {
        return <h2>Đang tải sản phẩm...</h2>;
    }
    const filteredProducts = products.filter(product => {
        const matchName = product.name
            .toLowerCase()
            .includes(keyword.toLowerCase());
        const matchCategory =
            category === "Tất cả"
            || product.category === category;
        return matchName && matchCategory;
    });
    return (
        <div className="home">
            <h1>
                Linh kiện máy tính
            </h1>
            <div className="toolbar">
                <input
                    type="text"
                    placeholder="🔍 Tìm sản phẩm..."
                    value={keyword}
                    onChange={(e)=>setKeyword(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                >
                    <option>Tất cả</option>
                    <option>CPU</option>
                    <option>GPU</option>
                    <option>RAM</option>
                    <option>Mainboard</option>
                    <option>SSD</option>
                </select>
            </div>
            <div className="product-grid">
                {
                    filteredProducts.map(product=>(
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </div>
        </div>
    );
};
export default Home;