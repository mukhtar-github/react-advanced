import React, { useState } from 'react';

const UseStateCounter = () => {
  const [value, setValue] = useState(0);
  return (
    <>
      <section style={{ margin: '4rem 0' }}>
        <h2>regular counter</h2>
        <h1>{value}</h1>
        <button className='btn'>decrease</button>
        <button className='btn'>reset</button>
        <button className='btn'>increase</button>
      </section>
    </>
  );
};

export default UseStateCounter;
