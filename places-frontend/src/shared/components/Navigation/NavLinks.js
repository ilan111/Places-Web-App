import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavLinks.css';

function NavLinks(props) {
    return (
        <div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" exact>ALL USERS</NavLink>
                </li>
                <li>
                    <NavLink to="/u1/places">MY PLACES</NavLink>
                </li>
                <li>
                    <NavLink to="/places/new">ADD PLACES</NavLink>
                </li>
                <li>
                    <NavLink to="/auth">AUTHENTICATION</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default NavLinks
