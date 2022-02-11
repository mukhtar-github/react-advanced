import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users';

const UseEffectFetchData = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    setUsers(users);
    //console.log(users);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
     <h3>Github Users</h3>
     {users.map(() => {
       
     })}
    </>
  );
};

export default UseEffectFetchData;
