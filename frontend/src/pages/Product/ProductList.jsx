import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import ProductSearch from "../../components/product/ProductSearch";
import ProductFilter from "../../components/product/ProductFilter";
import productApi from "../../api/productApi";
import { useAuth } from "../../contexts/AuthContext";
import "./ProductList.css";
import ProductSort from "../../components/product/ProductSort";
import Pagination from "../../components/product/Pagination";
const categories = [
    {
        id:1,
        name:"CPU"
    },
    {
        id:2,
        name:"GPU"
    },
    {
        id:3,
        name:"RAM"
    },
    {
        id:4,
        name:"SSD"
    }
];
const brands = [
    {
        id:1,
        name:"Intel"
    },
    {
        id:2,
        name:"AMD"
    },
    {
        id:3,
        name:"NVIDIA"
    }
];
const ProductList = () => {
    const [products,setProducts] = useState([]);
    const [keyword,setKeyword] = useState("");
    const [category,setCategory] = useState("");
    const [brand,setBrand] = useState("");
    const [loading,setLoading] = useState(true);
    const { user } = useAuth();
    const [error,setError] = useState("");
    const [sort, setSort] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                const response = await productApi.getAll();
                setProducts(response.data);
            }
            catch(error){
                console.log(
                    "Lỗi lấy sản phẩm:",
                error
                );
                setError("Không thể tải danh sách sản phẩm.");
            }
            finally{
                setLoading(false);
            }
        };
        fetchProducts();
    },[]);
    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );
    const handleDelete = async(id)=>{
        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa sản phẩm này?"
        );
        if(!confirmDelete)
            return;
        try{
            await productApi.delete(id);
            setProducts(prev =>
                prev.filter(
                    product => product.id !== id
                )
            );
            alert(
                "Xóa sản phẩm thành công"
            );
        }
        catch(error){
            console.log(error);
            alert(
                "Xóa thất bại"
            );
        }
    };
    const filteredProducts = [...products]
        .filter(product =>
            (product.name || "")
            .toLowerCase()
            .includes(keyword.toLowerCase())
        )
        .filter(product =>
            category === "" ||
            product.category === category ||
            product.category?.name === category
        )   
        .filter(product =>
            brand === "" ||
            product.brand === brand ||
            product.brand?.name === brand
        )
        .sort((a, b) => {
            if(sort === "priceAsc"){
                return a.price - b.price;
            }
            if(sort === "priceDesc"){
                return b.price - a.price;
            }
            if(sort === "nameAsc"){
                return a.name.localeCompare(b.name);
            }
            if(sort === "nameDesc"){
                return b.name.localeCompare(a.name);
            }
            return 0;
        });
    if(loading){
        return (
            <div className="loading">
                <h2>Đang tải sản phẩm...</h2>
            </div>
        );
    }
    if(error){
        return (
            <div className="loading">
                <h2>{error}</h2>
            </div>
        );
    }
    return (
        <div className="product-list">
            <h1>Danh sách sản phẩm</h1>
            <p className="product-count">
                Có {filteredProducts.length} sản phẩm
            </p>
            {
                user?.role === "ADMIN"
                &&
                (
                    <div className="toolbar">
                        <Link to="/admin/products/create">
                            <button className="add-product">
                                + Thêm sản phẩm
                            </button>
                        </Link>
                    </div>
                )
            }
            <ProductSearch
                keyword={keyword}
                setKeyword={setKeyword}
            />
            <ProductFilter
                categories={categories}
                brands={brands}
                selectedCategory={category}
                selectedBrand={brand}
                onCategoryChange={setCategory}
                onBrandChange={setBrand}
            />
            <ProductSort
                sort={sort}
                setSort={setSort}
            />
            <div className="grid">
                {
                    filteredProducts.length > 0
                    ?
                    currentProducts.map(product=>(
                        <ProductCard
                            key={product.id}
                            product={product}
                            isAdmin={
                                user?.role === "ADMIN"
                            }
                            onDelete={handleDelete}
                        />
                    ))
                    :
                    (
                        <h3>
                            Không có sản phẩm
                        </h3>
                    )
                }
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};
export default ProductList;