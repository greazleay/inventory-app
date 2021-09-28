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
            let res;
            try {
                res = await fetch(`https://inv-hub.herokuapp.com/api/products/${id}`);
            } catch (err) {
                if (err) return console.log(`${err.name}: ${err.message}`);
            };
            const data = await res.json();
            setProduct(data);
            setLoadingProduct(false);
        }
        fetchProduct();
    }, [id]);

    const setUpdateData = (data) => {
        localStorage.setItem('product', JSON.stringify(data));
    }

    const content = () => (<div className="category category-mod">
        <h2>{product.name}</h2><hr />
        <p><span>Description:</span> {product.description}</p><hr />
        <div className="categories">
            <span>Categories:</span>
            {product.categories.length && product.categories.map(category =>
                <Link key={category._id} to={`/categories/${category._id}`}>{category.name}</Link>
            )}
        </div><hr />
        <p><span>Price:</span> ${product.price}</p>
        <p><span>Stock:</span> {product.stock}</p>
        <img src={product.img} alt="" />
        <div className="btns">
            <Link to={`/products/${id}/modify`}>
                <button className="btn" onClick={() => setUpdateData(product)}>Modify Product</button>
            </Link>
            <Link to={`/products/${id}/delete`}>
                <button className="btn" onClick={() => setUpdateData(product)}>Delete Product</button>
            </Link>
        </div>
    </div>)
    return (
        <main className="main">
            {loadingProduct ? <p className="loading">Loading Product.....</p> : content()}
        </main>
    )
}

export default ProductDetails