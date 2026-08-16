import { useState } from "react";
import { Link } from "react-router-dom";
import BrandTable from "../../components/brand/BrandTable";
import "./BrandList.css";

const initialBrands=[
    {
        id:1,
        name:"Intel"
    },
    {
        id:2,
        name:"AMD"
    },
    {
        id:3,
        name:"NVIDIA"
    },
    {
        id:4,
        name:"ASUS"
    }
];
const BrandList =()=>{
    const [brands,setBrands]=useState(initialBrands);
    const handleDelete=(id)=>{
        const confirmDelete =
            window.confirm(
                "Bạn có chắc muốn xóa thương hiệu này?"
            );
        if(!confirmDelete)
            return;
        setBrands(
            brands.filter(
                brand=>brand.id!==id
            )
        );
    }
    return(
        <div className="brand-list">
            <h1>
                Quản lý thương hiệu
            </h1>
            <Link to="/admin/brands/create">
                <button className="add-btn">
                    Thêm thương hiệu
                </button>
            </Link>
            <BrandTable
                brands={brands}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default BrandList;