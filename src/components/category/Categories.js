import "../../assets/css/category/categories.css";
import React from "react";
import { Link } from "react-router-dom";

const Categories = (props) => {

    const categoryList = props.categories.map(category => (
        <div className="category" key={category._id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <Link to={`/categories/${category._id}`}>
                <button>View category</button>
            </Link>
        </div>
    ));

    const content = <div className="category-content">
        <Link to="/new-category">
            <button>New Category</button>
        </Link>
        {categoryList}
    </div>

    return (
        <main className="category-main">
            {props.loading ? <p className="loading">Loading categories.....</p> : content}
        </main>
    )
};

export default Categories