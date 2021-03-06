import "../../assets/css/product/products.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {

    const [loadingProducts, setLoadingProducts] = useState(true);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        let res;
        try {
            res = await fetch('https://inv-hub.herokuapp.com/api/products');
        } catch (err) {
            if (err) return console.log(`${err.name}: ${err.message}`);
        };

        const data = await res.json();
        setProducts(data);
        setLoadingProducts(false)
    };

    useEffect(() => {
        fetchProducts()
    }, []);

    const productList = products.map(product => (
        <div className="category" key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <img src={product.img} alt="" />
            <Link to={`/products/${product._id}`}>
                <button className="btn">View Product</button>
            </Link>
        </div>
    ));

    const content = <>
        <Link to="/new-product">
            <button className="btn">New Product</button>
        </Link>
        <div className="product-content">
            {productList}
        </div>
    </>


    return (
        <main className="main">
            {loadingProducts ? <p className="loading">Loading Products.....</p> : content}
        </main>
    )
};

export default Products