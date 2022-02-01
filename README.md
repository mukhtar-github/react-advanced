# React Advanced

## Starter Overview

## Corresponding Projects

### useState - Simple Use Case

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
