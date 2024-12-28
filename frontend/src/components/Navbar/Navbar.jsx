import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ navigation }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <NavLink to="/">
                        <img src="/assets/images/stroy.png" alt="Logo" width="120px"/>
                    </NavLink>
                </div>
                <nav>
                    <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
                        {navigation.map((link, index) => (
                            <li key={index} className="nav-item">
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div
                    className="burger-menu"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
