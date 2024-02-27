// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
        <nav className="nav-bar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/explore">Explore</Link></li>
                <li><Link to="/create-event">Create Event</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                {/* Lisää linkkejä tarpeen mukaan */}
            </ul>
        </nav>
    );
}

export default NavBar;