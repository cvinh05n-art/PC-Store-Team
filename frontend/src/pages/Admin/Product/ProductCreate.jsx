import { useState } from "react";
import { useNavigate } from "react-router-dom";

import productApi from "../../../api/productApi";

import "./ProductCreate.css";


const ProductCreate = () => {


    const navigate = useNavigate();



    const [product,setProduct] = useState({

        name:"",

        price:"",

        category:"",

        brand:"",

        image:"",

        description:""

    });



    const handleChange = (e)=>{


        setProduct({

            ...product,

            [e.target.name]:e.target.value

        });


    };
    
    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            const response = await productApi.create(product);

            console.log(response.data);

            alert(  
                "Thêm sản phẩm thành công"
            );

            navigate("/admin/products");

        }
        catch(error){

            console.log(
                "Lỗi thêm sản phẩm:",
                error
            );

            alert(
                "Thêm sản phẩm thất bại"
            );

        }

    };
    return (

        <div className="product-create">


            <h1>

                Thêm sản phẩm

            </h1>



            <form onSubmit={handleSubmit}>


                <label>
                    Tên sản phẩm
                </label>


                <input

                    name="name"

                    value={product.name}

                    onChange={handleChange}

                    placeholder="Nhập tên sản phẩm"

                />



                <label>
                    Giá
                </label>


                <input

                    name="price"

                    type="number"

                    value={product.price}

                    onChange={handleChange}

                    placeholder="Nhập giá"

                />



                <label>
                    Danh mục
                </label>


                <select

                    name="category"

                    value={product.category}

                    onChange={handleChange}

                >

                    <option value="">
                        Chọn danh mục
                    </option>


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

                    <option value="">
                        Chọn thương hiệu
                    </option>


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
                    Link hình ảnh
                </label>


                <input

                    name="image"

                    value={product.image}

                    onChange={handleChange}

                    placeholder="URL hình ảnh"

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

                    Lưu sản phẩm

                </button>


            </form>


        </div>

    );

};


export default ProductCreate;