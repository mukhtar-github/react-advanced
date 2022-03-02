import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';

// reducer function

const Index = () => {
  const [name, setName] = useState('');
  const [people, setPeople] = useState(data);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <Modal/>}
      <form onSubmit={handleSubmit}>
        <input
          type='text' 
          value={name} 
          onChange={() => setName(e.target.value)}
        />
      </form>
    </>
  );
};

export default Index;
