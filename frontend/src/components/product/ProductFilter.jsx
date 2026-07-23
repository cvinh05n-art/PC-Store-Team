import "./ProductFilter.css";

const ProductFilter = ({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}) => {
  return (
    <div className="filter-container">

      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Tất cả danh mục</option>

        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={selectedBrand}
        onChange={(e) => onBrandChange(e.target.value)}
      >
        <option value="">Tất cả thương hiệu</option>

        {brands.map((brand) => (
          <option key={brand.id} value={brand.name}>
            {brand.name}
          </option>
        ))}
      </select>

    </div>
  );
};

export default ProductFilter;