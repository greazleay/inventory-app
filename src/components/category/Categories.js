import "../../assets/css/category/categories.css";
import React, {  } from "react";
import { Link } from "react-router-dom";

const Categories = ({ categories, loading }) => {

    const categoryList = categories.map(category => (
        <div className="category" key={category._id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <Link to={`/categories/${category._id}`}>
                <button>View category</button>
            </Link>
        </div>
    ));

    console.log('===loading====>', categories.length)

    const content = <>
        <Link to="/new-category">
            <button className="btn">New Category</button>
        </Link>
        <div className="category-list">
            {categoryList}
        </div>
    </>

    return (
        <main className="category-main">
            {loading ? <p className="loading">Loading categories.....</p> : content}
        </main>
    )
};

export default React.memo(Categories, (prevProps, nextProps) => {
    return nextProps.loading === prevProps.loading
}) 