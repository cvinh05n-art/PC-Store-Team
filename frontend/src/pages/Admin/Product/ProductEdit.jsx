import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import productApi from "../../../api/productApi";

import "./ProductEdit.css";

const ProductEdit = () => {


    const { id } = useParams();

    const navigate = useNavigate();

    const [product,setProduct] = useState({

    name:"",

    price:"",

    category:"",

    brand:"",

    image:"",

    description:""

    });
    
    useEffect(()=>{

    const fetchProduct = async()=>{

        try{

            const response = await productApi.getById(id);

            setProduct(response.data);

        }
        catch(error){

            console.log(
                "Lỗi lấy sản phẩm:",
                error
            );

        }

    };

    fetchProduct();

    },[id]);

    const handleChange = (e)=>{

            setProduct({

                ...product,

                [e.target.name]:e.target.value

            });

        };  

        const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            await productApi.update(
                id,
                product
            );  

            alert(
                "Cập nhật sản phẩm thành công"
            );

            navigate("/admin/products");

        }
        catch(error){
            console.log(
                "Lỗi cập nhật:",
                error
            );

            alert(
                "Cập nhật thất bại"
            );

        }

    };

    return (

        <div className="product-edit">


            <h1>

                Chỉnh sửa sản phẩm

            </h1>



            <form onSubmit={handleSubmit}>


                <label>
                    Tên sản phẩm
                </label>


                <input

                    name="name"

                    value={product.name}

                    onChange={handleChange}

                />



                <label>
                    Giá
                </label>


                <input

                    type="number"

                    name="price"

                    value={product.price}

                    onChange={handleChange}

                />



                <label>
                    Danh mục
                </label>


                <select

                    name="category"

                    value={product.category}

                    onChange={handleChange}

                >

                    <option value="CPU">
                        CPU
                    </option>


                    <option value="GPU">
                        GPU
                    </option>


                    <option value="RAM">
                        RAM
                    </option>


                </select>



                <label>
                    Thương hiệu
                </label>


                <select

                    name="brand"

                    value={product.brand}

                    onChange={handleChange}

                >

                    <option value="Intel">
                        Intel
                    </option>


                    <option value="AMD">
                        AMD
                    </option>


                    <option value="NVIDIA">
                        NVIDIA
                    </option>


                </select>



                <label>
                    Hình ảnh
                </label>


                <input

                    name="image"

                    value={product.image}

                    onChange={handleChange}

                />



                <label>
                    Mô tả
                </label>


                <textarea

                    name="description"

                    value={product.description}

                    onChange={handleChange}

                />



                <button type="submit">

                    Cập nhật

                </button>


            </form>


        </div>

    );
};


export default ProductEdit;