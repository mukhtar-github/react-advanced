import React, { useState } from 'react';

// useState is a function
const UseStateBasics = () => {
  // console.log(useState('hello world'));
  // const value = useState(1)[0];
  // const handler = useState(1)[1];
  // console.log(useState(value, handler)); // [1, ƒ]
  const [text,setTexet] = useState('random title');

  const handleClick = () => {
    setTexet('hello world');
  }

  return <React.Fragment>
    <h1>{text}</h1>
    <button className='btn' onClick={handleClick}>
      change title
    </button>
  </React.Fragment>
};

export default UseStateBasics;
