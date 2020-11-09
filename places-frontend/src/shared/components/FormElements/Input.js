import React from 'react'
import './Input.css';

function Input(props) {
    const element = props.element==='input' ? (
        <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
        <textarea id={props.id} row={props.rows || 3}/>
    );

    return (
        <div className={`form-control`}>
            <label htmlFor={props.id} className="">{props.label}</label>
            {element}
        </div>
    )
}

export default Input
