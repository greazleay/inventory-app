import "../../assets/css/category/categoryDetails.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const CategoryDetail = () => {

    const [loadingCategory, setLoadingCategory] = useState(true);
    const [item, setItem] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchCategory = async () => {
            let res;
            try {
                res = await fetch(`https://inv-hub.herokuapp.com/api/categories/${id}`);
                if (!res.ok) throw new Error('Something went wrong')    
            } catch (err) {
                console.log(err.message);
                return
            }
            
            const data = await res.json();
            setItem(data);
            setLoadingCategory(false);
        };
        fetchCategory();
    }, [id])

    const setUpdateData = (data) => {
        localStorage.setItem('category', JSON.stringify(data));
    }

    const content = () => (<>
        <h2>{item.category.name}</h2>
        <p>{item.category.description}</p>
        <hr />
        {item.category_products.length && item.category_products.map(product =>
            <div key={product._id}>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <img src={product.img} alt="" />

            </div>
        )}
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