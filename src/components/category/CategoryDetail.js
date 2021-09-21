import "../../assets/css/CategoryDetail.css";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const CategoryDetail = () => {

    const [loadingCategory, setLoadingCategory] = useState(true);
    const [item, setItem] = useState({});
    const { id } = useParams()

    const fetchCategory = useCallback(async () => {
        const res = await fetch(`https://inv-hub.herokuapp.com/api/categories/${id}`);
        const data = await res.json();
        setItem(data);
        setLoadingCategory(false);
    }, [id])

    useEffect(() => {
        fetchCategory()
    }, [fetchCategory])

    const setUpdateData = (data) => {
        localStorage.setItem('category', JSON.stringify(data));
    }

    const content = () => (<>
        <h2>{item.category.name}</h2>
        <p>{item.category.description}</p>
        <Link to={`/categories/${id}/modify`}>
            <button onClick={() => setUpdateData(item.category)}>Modify Category</button>
        </Link>
        <Link to={`/categories/${id}/delete`}>
            <button onClick={() => setUpdateData(item.category)}>Delete Category</button>
        </Link>
    </>)
    return (
        <main className="category-detail-main">
            {loadingCategory ? <p className="loading">Loading Category.....</p> : content()}
        </main>
    )
}

export default CategoryDetail