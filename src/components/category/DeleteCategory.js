import "../../assets/css/product/deleteProduct.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";


const DeleteCategory = ({ refetchCategories }) => {
    const [loadingData, setLoadingData] = useState(true)
    const [category, setCategory] = useState({});
    let history = useHistory()
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        setCategory(JSON.parse(localStorage.getItem('category')))
        setLoadingData(false)
    }, [])

    const handleDelete = async () => {
        try {
            await axios.delete(`https://inv-hub.herokuapp.com/api/categories/${category._id}/delete`);
        } catch (err) {
            if (err) return console.log(`${err.name}: ${err.message}`)
        };
        await refetchCategories(true);
        setDeleted(true);
        setTimeout(() => { history.replace('/categories') }, 2000);
    }

    const content = () => (
        <>
            <div>
                <h1>Delete Category</h1>
                <hr />
            </div>
            {deleted && <h2>Category Deleted!!! Redirecting....</h2>}
            <div>
                <h2>{category.name}</h2>
                <p>{category.description}</p>
            </div>
            <div className="delete-options">
                <button className="btn btn-mod" onClick={handleDelete}>Delete</button>
                <Link to={`/categories/${category._id}`}>
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

export default DeleteCategory