import "../assets/css/NavBar.css";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import React from "react";

const NavBar = () => {
    return (
        <nav className="main-nav">
            <img src={logo} alt="logo" />
            <ul>
                <li><Link to="/inventory-app">HOME</Link></li>
                <li><Link to="/categories">CATEGORIES</Link></li>
                <li><Link to="/products">PRODUCTS</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar