import React from "react";

const SearchResults = ({ isSearching, results }) => {

    return (
        <main className="main">
            <h1>Search Results</h1><hr />
            {isSearching ? <p>Loading results.....</p> : results.map(result => (
                <div key={result._id}>
                    <p>{result.name}</p>
                    <p>{result.description}</p>
                    <img src={result.img} alt="" />
                </div>
            ))}

        </main>
    )
};

export default SearchResults