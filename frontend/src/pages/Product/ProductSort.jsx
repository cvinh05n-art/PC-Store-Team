const ProductSort = ({ sort, setSort }) => {
    return (
        <div className="product-sort">
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="">
                    Sắp xếp
                </option>
                <option value="priceAsc">
                    Giá tăng dần
                </option>
                <option value="priceDesc">
                    Giá giảm dần
                </option>
                <option value="nameAsc">
                    Tên A-Z
                </option>
                <option value="nameDesc">
                    Tên Z-A
                </option>
            </select>
        </div>
    );
};
export default ProductSort;