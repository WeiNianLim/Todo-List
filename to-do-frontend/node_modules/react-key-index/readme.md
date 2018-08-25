# react-key-index

> Generate stable, unique keys in your React components.

Play with the demo/example here [here](https://runkit.com/589b3ffeebe39d00147ce0dd/589b9f3ec90f930014b5adaa).

![react-key-index](http://www.automationfuel.com/content/images/2017/02/screenshot.png)

## What This Component Does

In brief: 

- This package adds a **permanent** and **unique** ID to every element in an array.
- If the paramter is an array of objects, then a unique id will be created for each property. 
- This permanent and unique ID can then be used as a key when iterating over the array in a React component.

Here's a sample of the IDs generated using this node module:

```javascript
[ 'jRfMcPcj',
  'kRf6cEcn',
  'lYf5cBcl',
  'mZfKc5cv',
  'n5fqcYcz',
  'o2fLcZcB',
  'pYfNcRcR',
  'qxfPcBcJ',
  'rkf0cKcK',
  'v2fjc3cA',
  'wpfzcvcB',
  'xkf4cMcR',
  'yPfzcOcE',
  'zpfpcZcw',
  'ADf3cvcP',
  'BBf9cYcr',
  'DkfKcycp',
  'ERfJcmcr',
  'G6fpcVcQ',
  'J6fmcgc7' ]
  ```

## Rational For Developing This Package

### Use Cases

You know that pesky error message in React telling you to specifiy a key when iterating over elements? I'm talking about situations like this:

```javascript
var arr = ["one", "two", "three"];

var list = arr.map((arr) => 
  <li>{arr}</li>
);
```

Use ```react-key-index``` to generate stable, predictable react key IDs. The keys are strings of numbers and letters that don't change when a component mounts or unmounts. 

### key={index} Is An Antipattern

Using ```key={index}``` is an [antipattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318#.vt7esin5q). Why? Well, if you push a new element into your array your application will display the wrong data because your index/value pairing won't be updated. 

## Simple Example

You can use ```keyIndex(arr, 1)``` to convert an array like ```["one", "two", "three"]``` into:

```javascript
[
  {
    value: "one",
    id: "kRf6c2fY"
  }, {
    value: "two",
    id: "lYf5cGfM",
  }, {
    value: "three",
    id: "mZfKcGf9"
  }
]
```

The first paramater in ```keyIndex(arr, 1)``` is the array you want to add keys (or IDs) to. The second paramter is a number to uniquely indentify your react component or use-case. 

Since the generated IDs are stable and predictable, using a different number each time you use the helper function ensures the uniqueness of the generated set of IDs.

## Complete Example

```javascript
import React from 'react';
import React from 'react-dom';
import keyIndex from 'react-key-index';

class App extends React.Component {
  render() {
    var arr = ["one", "two", "three"];
    arr = keyIndex(arr, 1);

    {/* 
    
    keyIndex() will convert arrays into an array of objects 
    with this structure: 
    [
      { id: kRf6c2fY, 
        value: value
      }, {
        ...
      }
    ]
    
    */}

    const list = arr.map((arr) => 
      <li key={arr.id}>{arr.value}</li>
    );
    return(
      <ul>{list}</ul>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Complex Example

Let's say you want to draw a table with three columns. This use-case is slightly more complicated because you need a unique ID for each column. Therefore you need a unique ID for each object property - a unique ID for each array element will not suffice. 

Suppose the data you want to display is formally as follows: 

```javascript
const data = [
  {
    product: 'sneakers',
    price: 20,
    quantity: 100
  }, {
    // more products
  }
]
```

Then ```keyIndex(data, 1)``` will return: 

```javascript
const data = [
  {
     {
      product: 'sneakers',
      _productId: 'kRf6c2fY',
      price: 20,
      _priceId: 'J6fmcgc7',
      quantity: 100,
      _quantityId: 'lYf5cGfM'
    }, {
      ...
    }
  }
]
```

And you'd use these ids as follows to create your table: 

```javascript
class App extends React.Component {
  render() {
    data = keyIndex(data, 1);
    const table = data.map((data) => 
      <tr>
        <td key={data._productId}>{data.product}</td>
        <td key={data._priceId}>{data.price}</td>
        <td key={data._quantityId}>{data.quantity}</td>
      </tr>
    );

    return(
      <table>
        <tbody>{table}</tbody>
      </table>
    );
  }
}
```

## Install

```
$ npm install --save react-key-index
```


## Usage

```js
const keyIndex = require('react-key-index');

keyIndex(arr, 1); 
```

## License

MIT © [Ben](http://automationfuel.com)
