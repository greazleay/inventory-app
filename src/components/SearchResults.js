import React from "react";
import { Link } from "react-router-dom";
import l404 from "../assets/images/404.png"

const SearchResults = ({ isSearching, results }) => {

    return (
        <main className="main">
            <div>
                <h1>Search Results</h1><hr />
            </div>
            {isSearching ? <p>Loading results.....</p>
                : !results.length ?
                    <div>
                        <h3>Oops!!! We cannot find what you are looking for.</h3>
                        <img src={l404} alt="" />
                    </div>
                    : results.map(result => (
                        <div className="category" key={result._id}>
                            <h3>{result.name}</h3><hr />
                            <p>{result.description}</p>
                            <img src={result.img} alt="" />
                            <Link to={`/products/${result._id}`}>
                                <button className="btn">View Details</button>
                            </Link>
                        </div>
                    ))}
        </main>
    )
};

export default SearchResults