import React, { useState } from 'react';

const HelloWorld = () => {
    const [counter, setCounter] = useState(0);
    const handleClick = () => {
        setCounter(counter + 1);
    };
    return (
        <>
            <span>Hello world</span>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    );
};

export default HelloWorld;
