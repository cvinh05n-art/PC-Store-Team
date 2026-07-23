import "./ProductSearch.css";

const ProductSearch = ({ keyword, setKeyword }) => {

    return (

        <div className="search-box">

            <input

                type="text"

                placeholder="Tìm kiếm sản phẩm..."

                value={keyword}

                onChange={(e)=>setKeyword(e.target.value)}

            />

        </div>

    );

};

export default ProductSearch;