const ProductSort = ({
    sort,
    onSortChange
}) => {

    return (

        <div className="product-sort">

            <select
                value={sort}
                onChange={(e) => {

                    // Lưu kiểu sắp xếp được chọn.
                    onSortChange(
                        e.target.value
                    );

                }}
            >

                {/* Không sắp xếp */}

                <option value="">
                    Sắp xếp
                </option>


                {/* Giá tăng dần */}

                <option value="priceAsc">
                    Giá tăng dần
                </option>


                {/* Giá giảm dần */}

                <option value="priceDesc">
                    Giá giảm dần
                </option>


                {/* Tên A-Z */}

                <option value="nameAsc">
                    Tên A-Z
                </option>


                {/* Tên Z-A */}

                <option value="nameDesc">
                    Tên Z-A
                </option>

            </select>

        </div>

    );
};

export default ProductSort;