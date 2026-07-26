import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCart } from "../../context/CartContext";
import productApi from "../../api/productApi";

import "./ProductDetail.css";


const ProductDetail = () => {


  const { id } = useParams();


  const { addToCart } = useCart();


  const [product,setProduct] = useState(null);


  const [loading,setLoading] = useState(true);



  useEffect(()=>{


    const fetchProduct = async()=>{


      try{


        const response = await productApi.getById(id);


        setProduct(response.data);


      }
      catch(error){


        console.log(
          "Lỗi lấy chi tiết sản phẩm:",
          error
        );


      }
      finally{


        setLoading(false);


      }


    };


    fetchProduct();


  },[id]);



  if(loading){

    return (

      <h2>
        Đang tải sản phẩm...
      </h2>

    );

  }



  if(!product){

    return (

      <h2>
        Không tìm thấy sản phẩm
      </h2>

    );

  }



  return (

    <div className="product-detail">


      <div className="product-image">


        <img

          src={product.image}

          alt={product.name}

        />


      </div>



      <div className="product-info">


        <h1>

          {product.name}

        </h1>



        <h2>

          {Number(product.price).toLocaleString()} đ

        </h2>



        <p>

          {product.description}

        </p>



        <button

          onClick={() => addToCart(product)}

        >

          Thêm vào giỏ hàng

        </button>


      </div>


    </div>

  );

};

export default ProductDetail;