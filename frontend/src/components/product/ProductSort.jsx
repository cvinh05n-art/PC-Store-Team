const ProductSort = ({
    sort,
    onSortChange
}) => {
    return (
        <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
        >
            <option value="">Sắp xếp</option>
            <option value="priceAsc">
                Giá tăng dần
            </option>
            <option value="priceDesc">
                Giá giảm dần
            </option>
            <option value="name">
                Theo tên
            </option>
        </select>
    );
};

export default ProductSort;