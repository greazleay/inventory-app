import "../../assets/css/product/deleteProduct.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

const DeleteProduct = () => {
    const [loadingData, setLoadingData] = useState(true)
    const [product, setProduct] = useState({});
    let history = useHistory()
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem('product')))
        setLoadingData(false)
    }, [])

    const handleDelete = async () => {
        try {
            await axios.delete(`https://inv-hub.herokuapp.com/api/products/${product._id}/delete`)
        } catch (err) {
            if (err) return console.log(`${err.name}: ${err.message}`);
        };
        setDeleted(true);
        setTimeout(() => { history.replace('/products') }, 2000);
    }

    const content = () => (
        <>
            <div>
                <h1>Delete Product</h1>
                <hr />
            </div>
            {deleted && <h2>Product Deleted!!!, Redirecting...</h2>}
            <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
            </div>
            <div className="delete-options">
                <button className="btn btn-mod" onClick={handleDelete}>Delete</button>
                <Link to={`/products/${product._id}`}>
                    <button className="btn btn-mod">Go back</button>
                </Link>
            </div>
        </>
    )

    return (
        <main className="main">
            {loadingData ? <p>Please Wait......</p> : content()}
        </main>
    )
}

export default DeleteProduct