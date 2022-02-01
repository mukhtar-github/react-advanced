# React Advanced

## Starter Overview

## Corresponding Projects

### useState Basics - Simple Use Case

#### tutorial/1-useState/setup/1-error-example.js

Fragments - A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

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
```



1 Birthday Reminder

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
