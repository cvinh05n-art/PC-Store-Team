import { useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../../components/product/ProductCard";
import ProductSearch from "../../components/product/ProductSearch";
import ProductFilter from "../../components/product/ProductFilter";

import "./ProductList.css";

const initialProducts = [
  {
    id: 1,
    name: "Intel Core i5-14600K",
    price: 8990000,
    image: "https://via.placeholder.com/300",
    category: "CPU",
    brand: "Intel",
  },
  {
    id: 2,
    name: "RTX 4070 Super",
    price: 18990000,
    image: "https://via.placeholder.com/300",
    category: "GPU",
    brand: "NVIDIA",
  },
  {
    id: 3,
    name: "Ryzen 7 7800X3D",
    price: 10990000,
    image: "https://via.placeholder.com/300",
    category: "CPU",
    brand: "AMD",
  },
];

const categories = [
  { id: 1, name: "CPU" },
  { id: 2, name: "GPU" },
  { id: 3, name: "RAM" },
];

const brands = [
  { id: 1, name: "Intel" },
  { id: 2, name: "AMD" },
  { id: 3, name: "NVIDIA" },
];

const ProductList = () => {
  const [productList, setProductList] = useState(initialProducts);

  const [keyword, setKeyword] = useState("");

  const [category, setCategory] = useState("");

  const [brand, setBrand] = useState("");

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này?"
    );

    if (!confirmDelete) return;

    setProductList(productList.filter((product) => product.id !== id));
  };

  return (
    <div className="product-list">
      <h1>Sản phẩm</h1>

      <div className="toolbar">
        <Link to="/admin/products/create">
          <button className="add-product">Thêm sản phẩm</button>
        </Link>
      </div>

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

      <div className="grid">
        {productList
          .filter((product) =>
            product.name
              .toLowerCase()
              .includes(keyword.toLowerCase())
          )
          .filter(
            (product) =>
              category === "" || product.category === category
          )
          .filter(
            (product) =>
              brand === "" || product.brand === brand
          )
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductList;