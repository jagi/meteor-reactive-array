# ReactiveArray for Meteor

**Table of contents**

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The ReactiveArray package introduces a reactive version of the JavaScript [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) object.

## Installation

```sh
$ meteor add jagi:reactive-array
```

## Usage

All methods are reactive. Values are stored in the original form, so you can also store functions and objects with functions. Objects are stored as references.

```js
var array = new ReactiveArray();

array.get(1); // Returns a value at index 1.
array.get(); // Returns all values.

array.length(); // Returns array length.

array.slice(1, -1); // Slices a chunk of array.

array.set(0, 'value'); // Insert a value at index 0.
array.set([ // Replace current values with new ones.
  'value1',
  'value2',
  'value3'
]);

// Pushes a value at the end and returns a new array length.
array.push('value4');
// Pops a value from the end and returns it.
array.pop();

// Pushes a value at the beginning and returns a new array length.
array.unshift('value0');
// Pops a value from the beginning and returns it.
array.shift();
```

More methods to come soon.
