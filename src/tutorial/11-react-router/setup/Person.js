import React, { useState, useEffect } from 'react';
import { data } from '../../../data';
import { Link, useParams } from 'react-router-dom';

const Person = () => {
  const [name, setName] = useState('default name');
  const {id} = useParams();
  return (
    <div>
      <h1>{name}</h1>
      <Link to='/people'>
        Back to People
      </Link>
    </div>
  );
};

export default Person;
