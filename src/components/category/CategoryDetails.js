import "../../assets/css/category/categoryDetails.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const CategoryDetails = () => {

    const [loadingCategory, setLoadingCategory] = useState(true);
    const [item, setItem] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchCategory = async () => {
            let res;
            try {
                res = await fetch(`https://inv-hub.herokuapp.com/api/categories/${id}`);
            } catch (err) {
                if (err) return console.log(`${err.name}: ${err.message}`);
            };
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
        <div className="category">
            <h2>{item.category.name}</h2>
            <p>{item.category.description}</p>
            <div className="btns">
                <Link to={`/categories/${id}/modify`}>
                    <button className="btn" onClick={() => setUpdateData(item.category)}>Modify Category</button>
                </Link>
                <Link to={`/categories/${id}/delete`}>
                    <button className="btn" onClick={() => setUpdateData(item.category)}>Delete Category</button>
                </Link>
            </div>
        </div>
        <hr />
        <h3>Related Products</h3>
        <div className="related-products">
            {item.category_products.length && item.category_products.map(product =>
                <div className="category" key={product._id}>
                    <img src={product.img} alt="" />
                    <p>{product.name}</p>
                    <Link to={`/products/${product._id}`}>
                        <button className="btn">View Product</button>
                    </Link>

                </div>
            )}
        </div>
    </>)
    return (
        <main className="main">
            {loadingCategory ? <p className="loading">Loading Category.....</p> : content()}
        </main>
    )
}

export default CategoryDetails