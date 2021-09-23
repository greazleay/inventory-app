import "../../assets/css/product/deleteProduct.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";


const DeleteProduct = () => {
    const [loadingData, setLoadingData] = useState(true)
    const [product, setProduct] = useState({});
    let history = useHistory()
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem('product')))
        setLoadingData(false)
    }, [])

    const handleDelete = () => {
        axios.delete(`https://inv-hub.herokuapp.com/api/products/${product._id}/delete`)
            .then(setTimeout(() => { history.push('/products') }, 2000))
            .catch((err) => {
                console.log(err.message)
                return
            })
        setDeleted(true)
    }

    const content = () => (
        <div>
            {deleted && <h2>Product Deleted!!!, Redirecting...</h2>}
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )

    return (
        <main>
            {loadingData ? <p>Please Wait......</p> : content()}
        </main>
    )
}

export default DeleteProduct