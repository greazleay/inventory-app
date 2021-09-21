import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";


const DeleteProduct = () => {
    const [loadingData, setLoadingData] = useState(true)
    const [product, setProduct] = useState({});
    let history = useHistory()
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem('Product')))
        setLoadingData(false)
    }, [])

    const handleDelete = () => {
        axios.delete(`https://inv-hub.herokuapp.com/api/categories/${product._id}/delete`)
            .then(setTimeout(() => { history.push('/categories') }, 2000))
        setDeleted(true)
    }

    const content = () => (
        <div>
            {deleted && <h2>Product Deleted!!!</h2>}
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