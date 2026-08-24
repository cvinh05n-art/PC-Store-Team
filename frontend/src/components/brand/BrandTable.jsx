import { Link } from "react-router-dom";
import "./BrandTable.css";

const BrandTable = ({ brands, onDelete }) => {

    return (

        <table className="brand-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Tên thương hiệu</th>

                    <th>Thao tác</th>

                </tr>

            </thead>

            <tbody>

                {
                    brands.map((brand)=>(

                        <tr key={brand.id}>

                            <td>
                                {brand.id}
                            </td>

                            <td>
                                {brand.name}
                            </td>

                            <td>

                                <Link 
                                    to={`/admin/brands/edit/${brand.id}`}
                                >

                                    <button className="edit-btn">

                                        Sửa

                                    </button>

                                </Link>
                                <button

                                    className="delete-btn"

                                    onClick={()=>
                                        onDelete(brand.id)
                                    }

                                >

                                    Xóa

                                </button>

                            </td>

                        </tr>

                    ))
                }

            </tbody>

        </table>

    );

}

export default BrandTable;