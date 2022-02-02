import React, { useState } from 'react';

const UseStateObject = () => {
  const [person, setPerson] = useState({
    name: 'Musa',
    age: 25,
    message: 'random message'
  });

const [name, setName] = useState('Musa');
const [age, setAge] = useState(25);
const [message, setMessage] = useState('random message');

const changeMessage = () => {
  setPerson({ ...person, message: 'hello world' })
}
  return (
    <>
      <h3>{name}</h3>
      <h3>{age}</h3>
      <h3>{message}</h3>
      <button className='btn' onClick={changeMessage}>
        change message
      </button>
   </>
  );
};

export default UseStateObject;
