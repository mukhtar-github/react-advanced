import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users';

const UseEffectFetchData = () => {
  const [users, setUsers] = useState([]);
  return (
    <>
     <h3>Github Users</h3>
    </>
  );
};

export default UseEffectFetchData;
