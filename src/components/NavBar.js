import "../assets/css/NavBar.css";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import React from "react";

const NavBar = ({ handleChange, searchTerm }) => {
    return (
        <nav className="nav">
            <img src={logo} alt="logo" />
            <div className="search">
                <input className="search-input" type="text" onChange={(e) => handleChange(e.target.value)} value={searchTerm} placeholder="Search Products"/>
                <Link to="/search">
                    <button className="search-btn">🔍</button>
                </Link>
            </div>
            <ul>
                <li><Link to="/inventory-app">HOME</Link></li>
                <li><Link to="/categories">CATEGORIES</Link></li>
                <li><Link to="/products">PRODUCTS</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar