import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../../context/auth-context';

import './NavLinks.css';

function NavLinks(props) {
    const auth = useContext(AuthContext);

    return (
        <div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" exact>ALL USERS</NavLink>
                </li>
                
                {auth.isLoggedIn && (
                <li>
                    <NavLink to="/u1/places">MY PLACES</NavLink>
                </li>
                )}

                {auth.isLoggedIn && (
                <li>
                    <NavLink to="/places/new">ADD PLACES</NavLink>
                </li>
                )}

                {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">AUTHENTICATION</NavLink>
                </li>
                )}
                {auth.isLoggedIn && (
                    <li>
                        <button onClick={auth.logout}>LOGOUT</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default NavLinks
