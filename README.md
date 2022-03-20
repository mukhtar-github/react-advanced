# React Advanced

npx create-react-app filename-app

## Starter Overview

### useState Basics - Simple Use Case

#### tutorial/1-useState/setup/1-error-example.js

#### Summary of React Components, Elements, and Instances

An *element* is a plain object describing what you want to appear on the screen in terms of the DOM nodes or other *components*. *Element*s can contain other *elements* in their props. Creating a React *element* is cheap. Once an *element* is created, it is never mutated.

A *component* can be declared in several different ways. It can be a class with a render() method. Alternatively, in simple cases, it can be defined as a function. In either case, it takes props as an input, and returns an *element* tree as the output.

When a *component* receives some props as an input, it is because a particular parent *component* returned an *element* with its type and these props. This is why people say that the props flows one way in React: from parents to children.

An instance is what you refer to as *this* in the *component* class you write. It is useful for storing local state and reacting to the lifecycle events.

Function *components* don’t have instances at all. Class *components* have instances, but you never need to create a *component* instance directly — React takes care of this.

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

So essentially, we would want to change and also, we'll want to keep the values between the renders, and also we'll want to trigger the re-render. And this is where useState hook comes into play, where it would allow us to do just that.

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

Every time you think of useEffect, think of work outside the component. By defaualt useEffect runs after every re-render. useEffect handles all the update by default.

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

If you only want useEffect to run in the initial render, then you should add the second argument, and you pass it as an *empty array*.

But when we pass a value into the the *empty array*, each time the value changed, the useEffect will run as well as the useState.

We can add as many useEffect in our component as we want. However, the second useEffect below only runs at the first render because we passed an *empty array* to it, and no value in the dependency list.

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
  }, [value]);// Only re-run the effect if value changes

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

So every time we have a useEffect, we have an option of *returning a function*, and the function will be invoked once we exit.

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

### Forms Basics

#### /tutorial/4-forms/setup/1-controlled-inputs.js

More specifically we're to cover control inputs, how they are and how they work. And also how we can setup multiple inputs with just one function.

General info on how forms works in react. When dealing with Controlled inputs, you'll be hooking up the input to a state value.

It's either you should use onSubmit but place it in the form element or you use onClick on the button element with type='submit'.

```javascript
import React, { useState } from 'react';
// Vanilla JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange

const ControlledInputs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hello world');
  };

  return (
  <article>
    <form className='form' onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor='firstName'>Name : </label>
        <input type='text' id='firstName' name='firstName' />
      </div>
      <div className="form-control">
        <label htmlFor='email'>Email : </label>
        <input type='text' id='email' name='email' />
      </div>
      <button type='submit'>add person</button>
    </form>
  </article>);
};

export default ControlledInputs;
```

#### Controlled Inputs

So now let's connect our inputs to the state value, as we're typing or submitting. In other words, accessing the data inside the input. So we setup state values for that.

So, we setup two attributes to the input element. One is going to be value, and the other is the EventListener onChange function, were we're going to setup our callback function. So that, each time we type something in the input, the state function will update the value.

The onChange function would help us to update the values typed in the form.

```javascript
import React, { useState } from 'react';
// Vanilla JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange

const ControlledInputs = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, email);
  };

  return (
  <article>
    <form className='form' onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor='firstName'>Name : </label>
        <input 
          type='text' 
          id='firstName' 
          name='firstName' 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor='email'>Email : </label>
        <input
          type='text' 
          id='email' 
          name='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type='submit'>add person</button>
    </form>
  </article>);
};

export default ControlledInputs;
```

#### Add Item To The List

So let's see how we can add the data dynamically to list. We'll return the person object and create id when adding the person object in the array to display.

Because in the list we need unique items, we can either use index instead or id, but index will not be suitable for adding and removing items in an array of objects.

An npm package uid is used to generate unique ids. But instead, we'll cheat a little bit by setting a date id.

So that's how we can combine the controlled inputs with the list.

```javascript
import React, { useState } from 'react';
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange

const ControlledInputs = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [people, setPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && email) {
      const person = { id: new Date().getTime().toString(), firstName, email };
      console.log(person);
      setPeople((people) => {
        return [...people, person];
      });
      setFirstName('');
      setEmail('');
    } else {
      console.log('empty values');
    }
  };

  return (
  <article>
    <form className='form' onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor='firstName'>Name : </label>
        <input 
          type='text' 
          id='firstName' 
          name='firstName' 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor='email'>Email : </label>
        <input
          type='text' 
          id='email' 
          name='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type='submit'>add person</button>
    </form>
    {
      people.map((person) => { // iterate through person
        const { id, firstName, email } = person; // grab the items from person
        return (//and display the items
          <div className='item' key={id}>
            <h4>{firstName}</h4>
            <p>{email}</p>
          </div>
        )
      })
    }
  </article>);
};

export default ControlledInputs;
```

### Multiple Inputs

#### /tutorial/4-forms/setup/2-multiple-inputs.js

Now we're going to look at forms with multiple inputs, not just two or three.

So it would be better, if we should have one useState and one fuction controlling the state. So we can do that by setting up one useState value.

We're using Spread operator inside the setPerson function to copy the old values of the person's object first. The we update the properties of the object dynamically.

```javascript
import React, { useState } from 'react';
// Vanilla JS
// const input = document.getElementById('myText');
// const inputValue = input.value

// React JS
// value, onChange
// dynamic object keys

const ControlledInputs = () => {
  const [person, setPerson] = useState({ firstName: '', email: '', age: '' });
  const [people, setPeople] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.firstName && person.email && person.age) {
      const newPerson = { ...person, id: new Date().getTime().toString() };
      setPeople([...people, newPerson]);
      setPerson({ firstName: '', email: '', age: '' });
    }
  };
  return (
    <>
      <article className='form'>
        <form>
          <div className='form-control'>
            <label htmlFor='firstName'>Name : </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={person.firstName}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Email : </label>
            <input
              type='email'
              id='email'
              name='email'
              value={person.email}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='age'>Age : </label>
            <input
              type='number'
              id='age'
              name='age'
              value={person.age}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='btn' onClick={handleSubmit}>
            add person
          </button>
        </form>
      </article>
      <article>
        {people.map((person) => {
          const { id, firstName, email, age } = person;
          return (
            <div key={id} className='item'>
              <h4>{firstName}</h4>
              <p>{email}</p>
              <p>{age}</p>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default ControlledInputs;
```

### Forms Corresponding Projects

8 Lorem Ipsum Generator
9 Color Shades Generator
10 Grocery Bud

### useRef

#### /tutorial/5-useRef/setup/1-useRef-basics.js

useRef works alot more like useState. It preserves values in between the renders. However there're some differences. One of the difference with useState, is that useRef hook does not trigger re-render.

We use useRef for targeting *DOM Nodes or elements*, and inturn allows us to setup *uncontrolled inputs*. In the case of our hanle submit function (onSubmit()), we can either place it in the form element or in the button element.

We're going to use the assigned useRef container (refContainer) as a ref attribute inside the input element. Since useRef doesn't trigger re-render, we don't worry about the dependency list array.

```javascript
import React, { useEffect, useRef } from 'react';

// preserves value
// DOES NOT trigger re-render
// target DOM nodes/elements

const UseRefBasics = () => {
  const refContainer = useRef(null);
  const divContainer = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(refContainer.current.value);
    console.log(divContainer.current);
  };

useEffect(() => {
  console.log(refContainer.current);
  refContainer.current.focus();
});

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <input type='text' ref={refContainer}/>
          <button type='submit'>
            submit
          </button>
        </div>
      </form>
      <div ref={divContainer}>
        hello world
      </div>
    </>
  );
};

export default UseRefBasics;
```

### useRef Corresponding Project

11 Navbar

### useReducer - useState Setup

#### /tutorial/6-useReducer/setup

useReducer is used, whenever we have a more complicated setup as far as the state. Because, essentially it will add more structure to your state as our apps gets more complicated.

Index.js in is the entry point in folders. Where you have many files in a folder, they all meet in the index.js file of that folder.

```javascript
import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';

// reducer function

const Index = () => {
  const [name, setName] = useState('');
  const [people, setPeople] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      setShowModal(true);
      setPeople([...people, {id: new Date().getTime().toString(),
        name}]);
      setName('');
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal && <Modal/>}
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <input
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
         />
        </div>
        <button type='submit'>add</button>
      </form>
      {people.map((person) => {
        return <div key={person.id}>
          <h4>{person.name}</h4>
        </div>
      })}
    </>
  );
};

export default Index;
```

### useReducer - Refactor

When we invoke useReducer, we're getting two things back. We're getting th state value, and then we're getting the dispatch function. Similar to useState, but the difference is, in the useReducer, the first thing that we pass in is the reducer function.

Another difference is that each and every time you want to do something, you must always use dispatch and it's going to go through the reducer. And you can think of the reducer funtion as something that takes in the old state, and takes in something called action, which we're going to cover later.

And then speeds back that new state. You can think of action as what are trying to do. Where we have showModal in the useState setup example, is going to be replaced with state in the useReducer, that is the object. And we use the property - isModalOpen, because that is the property that's responsible for showing the modal.

```javascript
import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';

// reducer function
const reducer = (state, action) => {

};

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: ''
};

const Index = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      
    } else {
      
    }
  };

  return (
    <>
      {state.isModalOpen && <Modal modalContent={state.modalContent}/>}
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <input
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
         />
        </div>
        <button type='submit'>add</button>
      </form>
      {state.people.map((person) => {
        return <div key={person.id}>
          <h4>{person.name}</h4>
        </div>
      })}
    </>
  );
};

export default Index;
```

### useReducer - Add Item

Once we've refactor to basic useReducer setup. Now let's see how the dispatch works, how the reducer works, and what is action. In order to efect anything in our state, we'll need to dispatch them.

We always need to pass an object to our dispatch function, with the property by the name of type. So that is going to be our action. Action is going tobe our object. And then in that object you must have the property by the name of type.  you set it equal a string in uppercase, that's the common practice.

Once you dispatch your action, then in reducer you
need to handle it. Reducer is taking as parameter, two things, state - right before update, and then what action you want it to do, that's testing.

One thing to keep in mind is that, from reducer, you always want to return some kind of state. Because, this is going to be that use case, where if you don't return, non of the functionalities that you have later, is going to make sence.

```javascript
import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';

// reducer function
const reducer = (state, action) => {
  console.log(state);
  if (action.type === 'ADD_ITEM') {
    const newPeople = [...state.people, action.payload];
    return {
      ...state, 
      people: newPeople, 
      isModalOpen: true, 
      modalContent: 'Item added'
    };
  } else if (action.type === 'NO_VALUE') {
    return { 
      ...state,
      isModalOpen: true,
      modalContent: 'please enter value'
    };
  }
  throw new Error('no matching action type');
};

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: ''
};

const Index = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(),
        name};
      dispatch({ type: 'ADD_ITEM', payload: newItem});
      setName('');
    } else {
      dispatch({ type: 'NO_VALUE' });
    }
  };

  return (
    <>
      {state.isModalOpen && <Modal modalContent={state.modalContent}/>}
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <input
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
         />
        </div>
        <button type='submit'>add</button>
      </form>
      {state.people.map((person) => {
        return <div key={person.id}>
          <h4>{person.name}</h4>
        </div>
      })}
    </>
  );
};

export default Index;
```

### useReducer - Remove Item

Since reducers do have a lot of functionalities, we do move them to a separeate file.

```javascript
// reducer function
export const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newPeople = [...state.people, action.payload];
    return {
      ...state, 
      people: newPeople, 
      isModalOpen: true, 
      modalContent: 'Item added'
    };
  }
  if (action.type === 'NO_VALUE') {
    return { 
      ...state,
      isModalOpen: true,
      modalContent: 'please enter value'
    };
  }
  if (action.type === 'CLOSE_MODAL') {
    return { ...state, isModalOpen: false };
  }
  if (action.type === 'REMOVE_ITEM') {
    const newPeople = state.people.filter(
      (person) => person.id !== action.payload
    );
    return { ...state, people: newPeople };
  }
  throw new Error('no matching action type');
};

// index.js
import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';
import { reducer } from './reducer';

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: ''
};

const Index = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(),
        name};
      dispatch({ type: 'ADD_ITEM', payload: newItem});
      setName('');
    } else {
      dispatch({ type: 'NO_VALUE' });
    }
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL'});
  };

  return (
    <>
      {state.isModalOpen && <Modal closeModal={closeModal} modalContent={state.modalContent}/>}
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <input
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
         />
        </div>
        <button type='submit'>add</button>
      </form>
      {state.people.map((person) => {
        return <div key={person.id} className='item'>
          <h4>{person.name}</h4>
          <button onClick={() => {
            dispatch({ type: 'REMOVE_ITEM', payload: person.id});
          }}>remove</button>
        </div>
      })}
    </>
  );
};

export default Index;
```

### Prop Drilling

#### /tutorial/7-prop-drilling/setup/1-prop-drilling.js

Prop Drilling is not an official term. However, it is somewhat of the side effect when you have multiple components, and then you have the big component tree, and then you need to start passing some state from the top component all the way to the bottom of your component tree.

And the reason why we'll cover Prop Drilling first, is because in the next tutorial, the useContext, we'll see how useContext fixes that. More specifically, we'll look at the context API that is design for that, and then useContext hook is the new way how we can access that context.

When returning a List, we need to pass in a key property inside the component element. We can also pass our functions as props inside the component element, we're not just limited to state values. And we need to distructure the function - removePerson, as well in the component function - List.

The idea of prop drilling here is that our List component, technically does not need to have access to the removePerson function, but we have no other way to pass down our function into the SinglePerson unless we actually pass it through the List, and that is what prop drilling is all about. So context api is used for this type of scenario, so that we can avoid prop drilling.

```javascript
import React, { useState } from 'react';
import { data } from '../../../data';

// more components
// fix - context api, redux (for more complex cases)

const PropDrilling = () => {
  const [people, setPeople] = useState(data);

  const removePerson = (id) => {
    setPeople((people) => {
      return people.filter((person) => person.id !== id);
    });
  };
  
  return (
  <section>
    <h3>prop drilling</h3>
    <List people={people} removePerson={removePerson} />
  </section>
  );
};

const List = ({ people, removePerson }) => {
  return (
    <>
      {people.map((person) => {
        return (
          <SinglePerson
            key={person.id}
            {...person}
            removePerson={removePerson}
          />
        );
      })}
    </>
  );
};

const SinglePerson = ({ id, name, removePerson }) => {
  return (
    <div className='item'>
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>remove</button>
    </div>
  );
};

export default PropDrilling;
```

### Context API - useContext

#### /tutorial/8-useContext/setup/1-context-api.js

We'll have two components - the Provider and the Consumer. With the arrival of useContext, we won't use the Consumer. Previously, before the hook was introduced, we were using the Consumer, however, now we don't have to.

You will essentially get two components back once you setup the createContext. The way you access those components is you're going to go with PersonContext.Provider or the Consumer.

Provider works as a distributor. What you would want to do is, since ContextAPI is our root component, where the rest of the components are rendered. So you'll need to find that root component and the return of that root component you would want to wrap in PersonContext and then the provider.

So why is that important, it's because in the Provider, we have the value prop, and why that is really cool, is that we can pass whatever we want into the value prop. And what's even more cool is that we can also use useContext to access this value, whatever it is.

So if we'll have two or three more components that are inside the SinglePerson component, we'll still be able to access them.

```javascript
import React, { useState, useContext } from 'react';
import { data } from '../../../data';
// more components
// fix - context api, redux (for more complex cases)

const PersonContext = React.createContext();
// two components - Provider, Consumer

const ContextAPI = () => {
  const [people, setPeople] = useState(data);
  const removePerson = (id) => {
    setPeople((people) => {
      return people.filter((person) => person.id !== id);
    });
  };
  return (
    <PersonContext.Provider value='hello'>
      <h3>prop drilling</h3>
      <List people={people} removePerson={removePerson} />
    </PersonContext.Provider>
  );
};

const List = ({ people, removePerson }) => {
  return (
    <>
      {people.map((person) => {
        return (
          <SinglePerson
            key={person.id}
            {...person}
            removePerson={removePerson}
          />
        );
      })}
    </>
  );
};

const SinglePerson = ({ id, name, removePerson }) => {
  const data = useContext(PersonContext);
  console.log(data);
  return (
    <div className='item'>
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>remove</button>
    </div>
  );
};

export default ContextAPI;

// After removing all the instances of removePerson as props and as parameter and also refactored people data to showcase the Context API

import React, { useState, useContext } from 'react';
import { data } from '../../../data';
// more components
// fix - context api, redux (for more complex cases)

const PersonContext = React.createContext();
// two components - Provider, Consumer

const ContextAPI = () => {
  const [people, setPeople] = useState(data);
  const removePerson = (id) => {
    setPeople((people) => {
      return people.filter((person) => person.id !== id);
    });
  };
  return (
    <PersonContext.Provider value={{ removePerson, people }}>
      <h3>ContextAPI / useContext</h3>
      <List />
    </PersonContext.Provider>
  );
};

const List = () => {
  const mainData = useContext(PersonContext);
  console.log(mainData);
  return (
    <>
      {mainData.people.map((person) => {
        return (
          <SinglePerson
            key={person.id}
            {...person}
          />
        );
      })}
    </>
  );
};

const SinglePerson = ({ id, name }) => {
  const { removePerson } = useContext(PersonContext);
  return (
    <div className='item'>
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>remove</button>
    </div>
  );
};

export default ContextAPI;
```

### useReducer and useContext Corresponding Projects

12 Modal and Sidebar.
13 Stripe Menus
14 Cart

### Custom Hook - useFetch

#### /tutorial/9-custom-hooks/setup/1-fetch-example.js

Essentially custom hooks allows us to reuse a functionality. We're not talking about reusing HTML elements, we already can do that with components. We're talking about a functionality, whether that is fetching data, saving to local storage, and that sort of things.

We are trying to come up with functionality that we can reuse. For example, if we should have another component that needs to fetch data, we don't need to duplicate our data fetching function.

Our functionality is stuck away in a different place, that is in the custom hook. So if we want to reuse it, every time we want to fetch data, instead of using the useState and setting up the loading and the other things, I will just call call useFetch and pass the URL.

And from the function, we'll get back two things, the loading as well as the products. And since it is a custom hook, it has to have the use word attached to it, because we're not allowed to use the hook inside the regular function. It's either the function needs to be a component or it's need to be a custom hook.

```javascript
// Custom Hook
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const response = await fetch(url);
        const products = await response.json();
        setProducts(products);
        setLoading(false);
    };
    useEffect(() => {
        getProducts();
    }, [url]);
    return { loading, products};
};

// Component Function
import { useFetch } from './2-useFetch.js';

const url = 'https://course-api.com/javascript-store-products';

const Example = () => {
  const { loading, products } = useFetch(url);
  console.log(products);
  return (
    <div>
      <h2>{loading ? 'loading...' : 'data'}</h2>
    </div>
  );
};

export default Example;
```

### PropTypes -  Setup

#### /tutorial/10-prop-types/setup/index.js

PropTypes allows us to validate our props, the props that we're passing into components.

```javascript
// index.js
import React from 'react';
import Product from './Product';
import { useFetch } from '../../9-custom-hooks/final/2-useFetch';

const url = 'https://course-api.com/react-prop-types-example';

const Index = () => {
  const { products } = useFetch(url);
  return (
    <div>
      <h2>products</h2>
      <section className='products'>
        {products.map((product) => {
          // for each and every product, we're returning a Product component
          // then we need to pass in the key prop,
          // and then we do the object spread operator, where we pass in all the properties for
          // each and every product into the Product component.
          return <Product key={product.id} {...product} />
        })}
      </section>
    </div>
  );
};

export default Index;

// Product.js
import React from 'react';

const Product = ({ image, name, price }) => {
  console.log({image, name, price});
  return (
    <article className='product'>
      <h4>single product</h4>
      {/* <img src={image.url} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p> */}
    </article>
  );
};

export default Product;
```

### PropTypes -  Images

In order to set propTypes, we have to setup a propType property on the component.

```javascript
// index.js
import React from 'react';
import Product from './Product';
import { useFetch } from '../../9-custom-hooks/final/2-useFetch';
// import defaultImage from '../../../assets/default-image.jpeg';

const url = 'https://course-api.com/react-prop-types-example';

const Index = () => {
  const { products } = useFetch(url);
  return (
    <div>
      <h2>products</h2>
      {/* <img src={defaultImage} alt='name'/> */}
      <section className='products'>
        {products.map((product) => {
          // for each and every product, we're returning a Product component
          // then we need to pass in the key prop,
          // and then we do the object spread operator, where we pass in all the properties for
          // each and every product into the Product component.
          return <Product key={product.id} {...product} />
        })}
      </section>
    </div>
  );
};

export default Index;

// Product.js
import React from 'react';
import PropTypes from 'prop-types';


const Product = ({ image, name, price }) => {
  console.log(image, name, price);
  return (
    <article className='product'>
      <img src={image.url} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
    </article>
  );
};

Product.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

Product.defaultProps = {
  //image: defaultImage,
  name: 'dafault name',
  price: 3.99
};

export default Product;
```

### PropTypes -  Default Values

Using Short Circuit Operators - ||, &&.

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../../assets/default-image.jpeg';


const Product = ({ image, name, price }) => {
  const url = image && image.url;

  return (
    <article className='product'>
      <img src={url || defaultImage} alt={name || 'default name'} />
      <h4>{name}</h4>
      <p>${price || 3.99}</p>
    </article>
  );
};

Product.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

// Product.defaultProps = {
//   image: defaultImage,
//   name: 'dafault name',
//   price: 3.99
// };

export default Product;
```

### React Router Intro

#### /tutorial/11-react-router/setup

When it comes to real apps, it's nice to have multiple pages. When we talk about Javascript frameworks, we're not talking about traditional HTML pages. In that case, we have a new term - a sinlge page application. Which just means that we have our one page, in this case where we have div with an id of root. And instead of going back to a server and requesting info about the pages where the user navigates, we setup a routing on the client side, without the page refreshing.

The index.js is where we're setting up our react router, and then the Navbar file is where we display the links. We've given our BrowserRouter an alias of Router. Normally when we work with react router, we wrap our whole application inside the Router in the root componet file.

> For a React component, props are the input, and an element tree is the output. The returned element tree can contain both elements describing DOM nodes, and elements describing other components. This lets you compose independent parts of UI without relying on their internal DOM structure.

We set our pages inside a Route, and then we have a path property (prop), this is where we showcase what is going to be our URL. And the first one is the home page, and for the home page we just go with '/', that just means the domain name for our application. When we want the exact page to display in our browser, we set the exact prop in the Routes.

```javascript
import React from 'react';
// react router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// pages
import Home from './Home';
import About from './About';
import People from './People';
import Error from './Error';
import Person from './Person';
// navbar
import Navbar from './Navbar';

const ReactRouterSetup = () => {
  return (
    <Router>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/people'>
        <People />
      </Route>
    </Router>
  );
};

export default ReactRouterSetup;
```

### React Router - Error and Switch Component

We will talk about Error pages and why we'll want to use Switch component as well.

In the Route of the Error page, we'll set the path to '*'. What star means is that, the Error page will always match. And that is where the Switch component comes into play. So inside the Router, we set the Switch component, and we place all our Route inside the Switch. And with a Switch component, only the first one that matches is displayed.
