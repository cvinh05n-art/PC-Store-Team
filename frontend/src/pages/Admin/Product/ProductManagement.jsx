import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import productApi from "../../../api/productApi";

import "./ProductManagement.css";

const ProductManagement = () => {


    const [products,setProducts] = useState([]);

    const [loading,setLoading] = useState(true);
    useEffect(()=>{


    const fetchProducts = async()=>{


        try{


           const response = await productApi.getAll();

                console.log(response.data);

                setProducts(
                response.data
            );

        }
        catch(error){


            console.log(
                "Lỗi lấy sản phẩm:",
                error
            );


        }
        finally{


            setLoading(false);


        }


    };



    fetchProducts();


    },[]);
    const handleDelete = async(id)=>{


    const confirmDelete = window.confirm(
        "Bạn có chắc muốn xóa sản phẩm?"
    );


    if(!confirmDelete)
        return;



    try{


        await productApi.delete(id);

            setProducts(prevProducts =>

            prevProducts.filter(

                product => product.id !== id

                )   

        );


            alert(
                "Xóa sản phẩm thành công"
            );


        }
        catch(error){

            console.log(
                "Lỗi xóa sản phẩm:",
                error
            );


            alert(
                "Xóa sản phẩm thất bại"
            );


        }


    };
    if(loading){

        return (

            <h2>
                Đang tải sản phẩm...
            </h2>

            );

    }

    return (

        <div className="product-management">


            <div className="header">


                <h1>

                    Quản lý sản phẩm

                </h1>



                <Link to="/admin/products/create">


                    <button>

                        Thêm sản phẩm

                    </button>


                </Link>


            </div>



            <table>


                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Tên sản phẩm</th>

                        <th>Giá</th>

                        <th>Danh mục</th>

                        <th>Thao tác</th>

                    </tr>

                </thead>

                <tbody>

                {

                    products.map(product=>(

                        <tr key={product.id}>

                            <td>
                                {product.id}
                            </td>

                            <td>
                                {product.name}
                            </td>

                            <td>

                                {Number(product.price).toLocaleString()} đ

                            </td>

                            <td>
                                {product.category}
                            </td>

                            <td>

                                <Link
                                    to={`/admin/products/edit/${product.id}`}
                                >

                                    <button>

                                        Sửa

                                    </button>

                                </Link>

                                <button

                                    onClick={()=>handleDelete(product.id)}

                                >

                                    Xóa

                                </button>

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

    );

};

export default ProductManagement;