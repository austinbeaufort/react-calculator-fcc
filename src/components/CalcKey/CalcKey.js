import React from 'react';

const calcKey = props => {
    return (
        <button onClick={props.click} id={props.id}>{props.keyValue}</button>
    )
}

export default calcKey;