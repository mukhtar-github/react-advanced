# React Advanced

## Starter Overview

### useState Basics - Simple Use Case

#### tutorial/1-useState/setup/1-error-example.js

#### Summary of React Components, Elements, and Instances

An *element* is a plain object describing what you want to appear on the screen in terms of the DOM nodes or other *components*. *Element*s can contain other *elements* in their props. Creating a React *element* is cheap. Once an *element* is created, it is never mutated.

A *component* can be declared in several different ways. It can be a class with a render() method. Alternatively, in simple cases, it can be defined as a function. In either case, it takes props as an input, and returns an *element* tree as the output.

When a *component* receives some props as an input, it is because a particular parent *component* returned an *element* with its type and these props. This is why people say that the props flows one way in React: from parents to children.

An instance is what you refer to as *this* in the *component* class you write. It is useful for storing local state and reacting to the lifecycle events.

Function *components* don’t have instances at all. Class *components* have instances, but you never need to create a *component* instance directly—React takes care of this.

Finally, to create *elements*, use React.createElement(), JSX, or an *element* factory helper. Don’t write *elements* as plain objects in the real code — just know that they are plain objects under the hood.

React *Element* - It is a simple object that describes a DOM node and its attributes or properties you can say. It is an immutable description object and you can not apply any methods on it.
Eg -

```javascript
<button class="blue"></button>
```

React *Component* - It is a function or class that accepts an input and returns a React *element*. It has to keep references to its DOM nodes and to the instances of the *child components*.

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

### useState Corresponding Projects

1 Birthday Reminder

### useEffect Basics

#### /tutorial/2-useEffect/setup/1-useEffect-basics.js

Every time you think of useEffect, think of work outside the component. By defaualt useEffect runs after every re-render.

The way useEffect works is by passing in the callback function, and whatever function we place inside the callback function will run after every render.

UseEffect is used when we want to setup side effect, and that is some work outside of the component. So think data fetching, think listining for events, think signing up for subscribtion, and stuffs along those lines.

```javascript
import React, { useState, useEffect } from 'react';
// by default runs after every re-render
// cleanup function
// second parameter
const UseEffectBasics = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log('call useEffect');
    document.title = `New Messages(${value})`;
  });
  console.log('render component');
  return <>
  <h1>{value}</h1>
  <button className='btn' onClick={() => setValue(value + 1)}>
    click me
  </button>
  </>;
};

export default UseEffectBasics;
```

### useEffect Conditional

 Hooks cannot be placed inside of conditional statements. Instead, the conditional statement be placed inside the callback function of the useEffect.

 ```javascript
import React, { useState, useEffect } from 'react';
// by default runs after every re-render
// cleanup function
// second parameter
const UseEffectBasics = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log('call useEffect');
    if (value >= 1) {
      document.title = `New Messages(${value})`;
    } 
  });
  console.log('render component');
  return <>
  <h1>{value}</h1>
  <button className='btn' onClick={() => setValue(value + 1)}>
    click me
  </button>
  </>;
};

export default UseEffectBasics;
 ```

### useEffect - Dependency list

What is *Second Parameter?* It is the parameter after the callback function of the useEffect, and it's an array of dependencies, that's called a *List of Dependencies.*

If you only want useEffect to run in the initial render, so you should add the second argument, and you pass it as an empty array.

But when we pass a value into the the empty array, each time the vaue changed, the useEffect will run as well as the useState.

We can add as many useEffect in our component as we want. However, the second useEffect only runs at the first render because we passed an empty array to it, and no value in the dependency list.

```javascript
import React, { useState, useEffect } from 'react';
// by default runs after every re-render
// cleanup function
// second parameter
const UseEffectBasics = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log('call useEffect');
    if (value >= 1) {
      document.title = `New Messages(${value})`;
    } 
  }, [value]);

  useEffect(() => {
    console.log('Hello World');
  }, []);

  console.log('render component');
  return <>
  <h1>{value}</h1>
  <button className='btn' onClick={() => setValue(value + 1)}>
    click me
  </button>
  </>;
};

export default UseEffectBasics;
// Initial Run Output
render component
call useEffect
Hello World
// Second Run Output
render component
call useEffect
```

### useEffect - Cleanup Function

#### /tutorial/2-useEffect/setup/2-useEffect-cleanup.js

So every time we have a useEffect, we have an option of returning a function, and the function will be invoked once we exit.

The Cleanup Function is very important when we start dealing with components appearing and disappearing in our applications, like conditional rendering.

```javascript
import React, { useState, useEffect } from 'react';

// cleanup function
// second argument

const UseEffectCleanup = () => {
  const [size, setSize] = useState(window.innerWidth);

  const checkSize = () => {
    setSize(window.innerWidth);
  };
  
  useEffect(() => {
    console.log('useEffect');
    window.addEventListener('resize', checkSize);
    return () => {
      console.log('cleanup');
      window.removeEventListener('resize', checkSize);
    };
  }, []);
  console.log('render');
  return (
    <>
    <h1>Window</h1>
    <h2>{size} PX</h2>
  </>
  );
};

export default UseEffectCleanup;
```

### useEffect - Fetch Data

#### tutorial/2-useEffect/setup/3-useEffect-fetch-data

> Async/Await returns a Promise!

You can either set Async/Await inside the callback function of the useEffect, or you set it up as a seperate funtion outside the useEffect. Because useEffect is looking for a Clean-up function not for a Promise.

Inside the Async/Await function we're using fetch(), wich is a build-in function to get our data. But you can use Axios or some extenal libraries wich probably should be better for projects.

With the console.log() in the getUsers function, we do not trigger re-render to avoid crashing of the browser. But when we provide the dependency list empty array to the useEffect function, we'll avoid the crashing of the browser.

> UseState preserves values and triggers re-render.

```javascript
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
     <ul className='users'>
        {users.map((user) => {
          const { id, login, avatar_url, html_url } = user;
          return <li key={id}>
            <img src={avatar_url} alt={login} />
            <div>
              <h4>{login}</h4>
              <a href={html_url}>Profile</a>
            </div>
          </li>
        })}
     </ul>
    </>
  );
};

export default UseEffectFetchData;
```

### Conditional Rendering

#### Multiple Returns

#### tutorial/3-conditional-rendering/setup/1-multiple-returns

In Javascript, the first return in a function overrides the subsequent returns that follows. You can setup the whole application inside one component. It's about if a condition is not met, then you have your default to return.

Example is when loading a user's page, and if not found then the default signing up page loads instead. So if we didn't set up the the condition, the fisrt return will be the only one loading.

```javascript
import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users/QuincyLarson';

const MultipleReturns = () => {
  const [loading, setLoading] = useState(false);
  
  if (loading) {
    return <h2>Loading...</h2>
  }

  return <h2>multiple returns</h2>;
};

export default MultipleReturns;
```

#### Multiple Returns - Fetching Data

We'll set the useEffect where we'll control our conditions. With fetch function, we have .then because we're expecting a promise to be returned. After a successful fetch request setting, we setup conditions for loading the data.

```javascript
import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users/QuincyLarson';

const MultipleReturns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState('default user');

  useEffect(() => {
    fetch(url)
    .then((resp) => {
      if (resp.status >= 200 && resp.status <= 299) {
        return resp.json();
      } else {
        setIsLoading(false);
        setIsError(true);
        throw new Error(resp.statusText);
      }
    })
    .then((user) => {
      const { login } = user;
      setUser(login);
      setIsLoading(false);
    })
    .catch(error => console.log(error));
  },[]);

  if (isLoading) {
    return (
      <div>
      <h1>Loading...</h1>
    </div>
    )
  }

  if (isError) {
    return (
      <div>
      <h1>Error...</h1>
    </div>
    )
  }

  return (
      <div>
      <h1>{user}</h1>
    </div>
    );
};

export default MultipleReturns;
```

#### Short-Circuit Evaluation

#### /tutorial/3-conditional-rendering/setup/2-short-circuit

In react, JSX has to return a value, that's why we setup expressions. So we'll work with short-circuits and ternary operators to display values conditionally in the expressions.

If we use OR (||) operator in our expressions and the first value is falsy, it will return the the second value. But in the case of AND (&&) operator, if the first value is true, it returns the second value.

```javascript
import React, { useState } from 'react';
// short-circuit evaluation
// ternary operator

const ShortCircuit = () => {
  const [text, setText] = useState('');
  const firstValue = text || 'hello world';
  const secondValue = text && 'hello world';

  return (
  <>
    {/* <h1>{firstValue}</h1>
    <h1>Value : {secondValue}</h1> */}
    {/*{if(){console.log('hello world')}}*/}
    <h1>{text || 'john doe'}</h1>
    {text && <h1>hello world</h1>}
    {!text && <h1>hello world</h1>}
  </>
  )
};

export default ShortCircuit;
```

When we're toggling the useState between truthy and falsy, the && operator will be responding based on that.

```javascript
import React, { useState } from 'react';

const ShortCircuit = () => {
  const [isError, setIsError] = useState(false);
  return (
  <>
    <button className='btn'onClick={() => setIsError(!isError)}>toggle error</button>
    {isError && <h1>Error...</h1>}
  </>
  )
};
```

#### Ternary Operator

The difference between Ternary Operator and the Short-circuit evaluation is the fact that the former will give you two possible values. Example, show A if it's true or show B if it's false.

We cannot use if statement, because it doesn't return a value. We either use Short-circuits or Ternary Operators.

```javascript
import React, { useState } from 'react';
// short-circuit evaluation
// ternary operator

const ShortCircuit = () => {
  const [text, setText] = useState('');
  const [isError, setIsError] = useState(false);

  // const firstValue = text || 'hello world';
  // const secondValue = text && 'hello world';

  return (
  <>
    {/* <h1>{firstValue}</h1>
    <h1>Value : {secondValue}</h1> */}
    {/*{if(){console.log('hello world')}}*/}
    <h1>{text || 'john doe'}</h1>
    <button className='btn'onClick={() => setIsError(!isError)}>toggle error</button>
    {isError && <h1>Error...</h1>}
    {/* {text && <h1>hello world</h1>}
    {!text && <h1>hello world</h1>} */}
    {isError ? (
    <p>there is an error...</p>) : (
      <div>
        <h2>there is no error</h2>
      </div>
    )}
  </>
  )
};

export default ShortCircuit;
```

#### Show/Hide Component

#### /tutorial/3-conditional-rendering/setup/3-show-hide

This example is going to show us why the cleanup function is sometimes used instead of using the empty array of the dependency list.

Set the state value to be opposite the initial value.

We're not only limited to just HTML elements. This example shows that we can toggle with react components as well.

```javascript
import React, { useState, useEffect } from 'react';

const ShowHide = () => {
  const [show, setShow] = useState(false);
  return (
  <>
    <button className='btn' onClick={() => setShow(!show)}>
      show/hide
    </button>
    {show && <Item />}
  </>
  );
};

const Item = () => {
  const [size, setSize] = useState(window.innerWidth);

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
    }; 
  }, []);

  return (
    <div style={{ marginTop: '2rem'}}>
      <h1>window</h1>
      <h2>size : {size} PX</h2>
    </div>
  )
}

export default ShowHide;
```

### useEffect and Conditional Rendering Corresponding Projects

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
