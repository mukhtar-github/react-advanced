# React Advanced

## Starter Overview

### useState Basics - Simple Use Case

#### tutorial/1-useState/setup/1-error-example.js

#### Summary of React Components, Elements, and Instances

An *element* is a plain object describing what you want to appear on the screen in terms of the DOM nodes or other *components*. *Element*s can contain other *elements* in their props. Creating a React *element* is cheap. Once an *element* is created, it is never mutated.

A *component* can be declared in several different ways. It can be a class with a render() method. Alternatively, in simple cases, it can be defined as a function. In either case, it takes props as an input, and returns an *element* tree as the output.

When a *component* receives some props as an input, it is because a particular parent *component* returned an *element* with its type and these props. This is why people say that the props flows one way in React: from parents to children.

An instance is what you refer to as this in the *component* class you write. It is useful for storing local state and reacting to the lifecycle events.

Function *components* don’t have instances at all. Class *components* have instances, but you never need to create a *component* instance directly—React takes care of this.

Finally, to create *elements*, use React.create*Element*(), JSX, or an *element* factory helper. Don’t write *elements* as plain objects in the real code—just know that they are plain objects under the hood.

React *Element* - It is a simple object that describes a DOM node and its attributes or properties you can say. It is an immutable description object and you can not apply any methods on it.
Eg -

```javascript
<button class="blue"></button>
```

React *Component* - It is a function or class that accepts an input and returns a React *element*. It has to keep references to its DOM nodes and to the instances of the child **components*.

```javascript
const SignIn = () => (
  <div>
   <p>Sign In</p>
   <button>Continue</button>
   <button color='blue'>Cancel</button>
  </div>
);
```

Fragments - A common pattern in React is for a *component* to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

```javascript
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
// Or
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}

```

Why we cannot see the changed title in the error example file, is because we're not re-rendering the component, because we didn't preserve the changed value in between the renders. We can only see the change in cosole.log().

So essentially we would want to change and also, we'll want to keep the values between the renders, and also we'll want to trigger the re-render. And this where useState hook comes into play, where it would allow us to do just that.

```javascript
import React from 'react';

const ErrorExample = () => {
  let title = 'random title';
  const handleClick = () => {
    title = 'hello people';
    console.log(title);
  }
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <button type='button' className='btn' onClick={handleClick}>
        change title
      </button>
    </React.Fragment>
  );
};

export default ErrorExample;
```

#### /tutorial/1-useState/setup/2-useState-basics.js

useState is a function from react, and it is a named function, so when importing it, it must have curly brace.

So what does useState function returns? When we invoke it, it returns an array of undefined and a function. The undefined is the state value that we'll use, and the function will control the state value.

The state value was undefined, because we didn't pass a value when invoking it. Keep in mind that this value can be a string, it can be a number, an array, an object, bolean, whatever javascript value you would want.

For example, if we pass 'hello world' into the function, it will return the string 'hello world' in the console.

So keep in mind that, if useState returns an array, ofcourse we can assign it to a variable.

Since we have array destructuring in JS, it allows us to set everything in one line.

> What do we pass to useState as an argument? The only argument to the useState() Hook is the initial state.

```javascript
import React, { useState } from 'react';

// useState is a function
const UseStateBasics = () => {
  //console.log(useState);
  console.log(useState())
  return <h2>useState basic example</h2>;
};

export default UseStateBasics;

// Output in UI console
ƒ useState(initialState) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useState(initialState);
    }

// Output in UI console when invoked
(2) [undefined, ƒ]
0: undefined
1: ƒ ()

// Output in UI console when invoked with a string value
['hello world', ƒ]

const UseStateBasics = () => {
  const value = useState(1)[0];
  const handler = useState(1)[1];
  console.log(useState(value, handler)); // [1, ƒ]
  return <h2>useState basic example</h2>;
};

import React, { useState } from 'react';

// Rules of Hooks
// Starts with use
// Component name must be uppercase
// Invoke inside function/component body
// Don't call hooks conditonally

// useState is a function
const UseStateBasics = () => {
  // console.log(useState('hello world'));
  // const value = useState(1)[0];
  // const handler = useState(1)[1];
  // console.log(useState(value, handler)); // [1, ƒ]
  const [text,setText] = useState('random title');

  const handleClick = () => {
    if (text === 'random title') {
      setText('hello world');
    } else {
      setText('random title');
    }
  };

  return <React.Fragment>
    <h1>{text}</h1>
    <button className='btn' onClick={handleClick}>
      change title
    </button>
  </React.Fragment>
};

export default UseStateBasics;
```

#### General Rules of Hooks

- Starts with use
- Component name must be uppercase
- Invoke inside function/component body
- Don't call hooks conditonally

#### useState - Array Examples

When importing useState into the component file, you can either use;

```javascript
// import React, { useState } from 'react';
// or import inline
// const [people, setPeople] = React.useState([]);

import React from 'react';
import { data } from '../../../data';

const UseStateArray = () => {
  const [people, setPeople] = React.useState(data);

  const removeItem = (id) => {
    let newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  }
  return ( 
  <>
  {
    people.map((person) => {
      const { id, name } = person;
      return (
        <div key={id} className='item'>
          <h4>{name}</h4>
          <button onClick={() => removeItem(id)}>remove</button>
        </div>
      );
    })
  }
  <button className='btn' onClick={() => setPeople([])}>
    Clear Items
  </button>
  </>
  );
};

export default UseStateArray;
```

Ideally, if the useState function is going to be invoked once, the inline import may be quicker, but if it involves many invokes, it is better to use file import format.

The arrow function inside the onClick in a button, prevents the invoked function inside the onClick to run each time we render our app until the button is clicked.

#### useState - Object Example

With the spread operator, we'll first copy the values of an object, and then we came up with which ever value we want to override. In the example below, all the values in the person's object will be copied, and only the message value will be overridden.

```javascript
import React, { useState } from 'react';

const UseStateObject = () => {
  const [person, setPerson] = useState({
    name: 'Musa',
    age: 25,
    message: 'random message'
  });
const changeMessage = () => {
  setPerson({ ...person, message: 'hello world' })
}
  return (
    <>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h3>{person.message}</h3>
      <button className='btn' onClick={changeMessage}>
        change message
      </button>
   </>
  );
};

export default UseStateObject;
```

#### useState - Multiple State Values

In this case we're not dealing with the object, we'll only be dealing with the useState values directly.

Also, there's no rule that prevents you from setting as many useState as you want. As shown in the below example.

```javascript
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
  //setPerson({ ...person, message: 'hello world' });
  setMessage('hello world');
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
```

#### Simple useState Counter Example

We're going to show case how to setup a simple Counter update form. In the previous examples, we've been using the value update form.

```javascript
import React, { useState } from 'react';

const UseStateCounter = () => {
  const [value, setValue] = useState(0);

  const reset = () => {
    setValue(0);
  };
  return (
    <>
      <section style={{ margin: '4rem 0' }}>
        <h2>regular counter</h2>
        <h1>{value}</h1>
        <button className='btn' onClick={() => setValue
          (value - 1)}>decrease</button>
        <button className='btn' onClick={reset}>reset</button>
        <button className='btn' onClick={() => setValue
          (value + 1)}>increase</button>
      </section>
    </>
  );
};

export default UseStateCounter;
```

#### Functional Update Form Example

We're going to show case how to setup a functional update form.

In the setTimeout function, we have a callback function and the time value.

```javascript
import React, { useState } from 'react';

const UseStateCounter = () => {
  const [value, setValue] = useState(0);

  const reset = () => {
    setValue(0);
  };

  const complexIncrease = () => {
    setTimeout(() => {
      //setValue(value + 1);
      setValue((prevState)=>{
        return prevState + 1;
      });
    }, 2000);
  };
  return (
    <>
      <section style={{ margin: '4rem 0' }}>
        <h2>regular counter</h2>
        <h1>{value}</h1>
        <button className='btn' onClick={() => setValue
          (value - 1)}>decrease</button>
        <button className='btn' onClick={reset}>reset</button>
        <button className='btn' onClick={() => setValue
          (value + 1)}>increase</button>
      </section>

      <section style={{ margin: '4rem 0' }}>
        <h2>more complex counter</h2>
        <h1>{value}</h1>
        <button className='btn' onClick={complexIncrease}>
          increase later
        </button>
      </section>
    </>
  );
};

export default UseStateCounter;
```

### Corresponding Projects

1 Birthday Reminder

### useEffect Basics

#### /tutorial/2-useEffect/setup/1-useEffect-basics.js

Every time you think of useEffect, think of work outside the component.

### useEffect and Conditional Rendering

2 Tours
3 Reviews
4 Accordion
5 Menu
6 Tabs
7 Slider

### Forms

8 Lorem Ipsum Generator
9 Color Shades Generator
10 Grocery Bud

### useRef

11 Navbar

### useContext

12 Modal and Sidebar
13 Stripe Menus

### useReducer and useContext

14 Cart

### React Router
