import { Link } from "react-router-dom";

const BrandTable = ({
    brands,
    onDelete
}) => {

    return (
        <div className="brand-table-wrapper">

            <table className="brand-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên thương hiệu</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>

                <tbody>

                    {brands.length === 0 ? (

                        <tr>
                            <td
                                colSpan="3"
                                className="empty-row"
                            >
                                Chưa có thương hiệu nào.
                            </td>
                        </tr>

                    ) : (

                        brands.map((brand, index) => {

                            const brandId =
                                brand._id || brand.id;

                            return (
                                <tr
                                    key={brandId}
                                >

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        {brand.name}
                                    </td>

                                    <td>

                                        <div className="brand-actions">

                                            <Link
                                                to={`/admin/brands/edit/${brandId}`}
                                            >
                                                <button
                                                    className="edit-btn"
                                                >
                                                    Sửa
                                                </button>
                                            </Link>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    onDelete(
                                                        brandId
                                                    )
                                                }
                                            >
                                                Xóa
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            );
                        })

                    )}

                </tbody>

            </table>

        </div>
    );
};

export default BrandTable;