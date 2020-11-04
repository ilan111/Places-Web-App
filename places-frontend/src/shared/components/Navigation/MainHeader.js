import React from 'react';
import './MainHeader.css';

function MainHeader(props) {
    return (
        <div>
            <header className="main-header">
                {props.children}
            </header>
        </div>
    )
}

export default MainHeader
