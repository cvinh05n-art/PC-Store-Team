import "./ProductFilter.css";

const ProductFilter = ({
    categories,
    brands,
    selectedCategory,
    selectedBrand,
    onCategoryChange,
    onBrandChange
}) => {

    return (

        <div className="filter-container">

            {/* =========================
                LỌC THEO DANH MỤC
            ========================= */}

            <select
                value={selectedCategory}
                onChange={(e) => {

                    // Lưu ID danh mục được chọn.
                    // Không reset thương hiệu.
                    // Vì vậy có thể lọc Category + Brand cùng lúc.

                    onCategoryChange(
                        e.target.value
                    );

                }}
            >

                <option value="">
                    Tất cả danh mục
                </option>

                {categories.map((category) => (

                    <option
                        key={category._id}
                        value={category._id}
                    >
                        {category.name}
                    </option>

                ))}

            </select>


            {/* =========================
                LỌC THEO THƯƠNG HIỆU
            ========================= */}

            <select
                value={selectedBrand}
                onChange={(e) => {

                    // Lưu ID thương hiệu được chọn.
                    // Không reset danh mục.

                    onBrandChange(
                        e.target.value
                    );

                }}
            >

                <option value="">
                    Tất cả thương hiệu
                </option>

                {brands.map((brand) => (

                    <option
                        key={brand._id}
                        value={brand._id}
                    >
                        {brand.name}
                    </option>

                ))}

            </select>

        </div>

    );
};

export default ProductFilter;