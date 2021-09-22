import "../../assets/css/product/deleteProduct.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";


const DeleteCategory = () => {
    const [loadingData, setLoadingData] = useState(true)
    const [category, setCategory] = useState({});
    let history = useHistory()
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        setCategory(JSON.parse(localStorage.getItem('category')))
        setLoadingData(false)
    }, [])

    const handleDelete = () => {
        axios.delete(`https://inv-hub.herokuapp.com/api/categories/${category._id}/delete`)
            .then(setTimeout(() => { history.push('/categories') }, 2000))
        setDeleted(true)
    }

    const content = () => (
        <div>
            {deleted && <h2>Category Deleted!!! Redirecting....</h2>}
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )

    return (
        <main>
            {loadingData ? <p>Please Wait......</p> : content()}
        </main>
    )
}

export default DeleteCategory