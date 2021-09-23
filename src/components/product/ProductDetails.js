import "../../assets/css/product/productDetails.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const ProductDetails = () => {

    const [loadingProduct, setLoadingProduct] = useState(true);
    const [product, setProduct] = useState({});
    const { id } = useParams()

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`https://inv-hub.herokuapp.com/api/products/${id}`);
            const data = await res.json();
            setProduct(data);
            setLoadingProduct(false);
        }
        fetchProduct();
    }, [id]);

    const setUpdateData = (data) => {
        localStorage.setItem('product', JSON.stringify(data));
    }

    const content = () => (<>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        {product.categories.length && product.categories.map(category =>
            <p key={category._id}>{category.name}</p>
        )}
        <p>{product.price}</p>
        <p>{product.stock}</p>
        <img src={product.img} alt="" />
        <Link to={`/products/${id}/modify`}>
            <button onClick={() => setUpdateData(product)}>Modify Product</button>
        </Link>
        <Link to={`/products/${id}/delete`}>
            <button onClick={() => setUpdateData(product)}>Delete Product</button>
        </Link>
    </>)
    return (
        <main className="category-detail-main">
            {loadingProduct ? <p className="loading">Loading Product.....</p> : content()}
        </main>
    )
}

export default ProductDetails