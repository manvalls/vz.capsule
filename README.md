[![NPM](https://nodei.co/npm/vz.capsule.png?downloads=true)](https://nodei.co/npm/vz.capsule/)

This package uses or may use at some point in the future ECMAScript 6 features. Use it on a compatible environment or transpile it with Traceur, Closure Compiler, es6-transpiler or equivalent. Please note that some of these have flaws and bugs, test your code carefully until you find a suitable tool for your task.

When cloning this repository, put the folder inside another named "node_modules" in order to avoid potential errors related to npm's dependency handling, and then run `npm install` on it.

No piece of software is ever completed, feel free to contribute and be humble.

# vz Capsule

## Sample usage:

```javascript

var Capsule = require('vz.capsule'),
    c = new Capsule({
      dog: {
        name: 'Roof',
        sex: 'male',
        age: 5,
        numberOfFleas: 53
      }
    });

c.get('dog','name'); // Roof

c.watcher.on('dog.age',function(newAge,oldAge){
  // Our dog just got older!
});

c.set({
  dog: {
    age: c.get('dog','age') + 1,
    numberOfFleas: 5347
  }
});

```

## Reference

### Capsule object

#### Constructor([internal object])

Creates and initializes a new Capsule, with *internal object* as its internal object. If *internal object* is not specified, the capsule isn't initialized and may be initialized later by calling `Capsule.call(capsule,internal_object);`.

#### static Capsule.encapsulate([internal object,]external object)

Encapsulates *internal object* inside of *external object*, letting *external object* behave like a Capsule without touching its prototype.

#### Capsule.get([property1[,property2,...]])

Returns the result of recursively accessing properties from the internal object downwards. If no properties are specified, ie calling Capsule.get() with no arguments, the internal object itself is returned. A few variants of this function are available:

##### Capsule.getByArray(array)

Calls Capsule.get with the arguments present in the array.

##### Capsule.int([property1[,property2,...]])

Converts to int the result of Capsule.get

##### Capsule.float([property1[,property2,...]])

Converts to float the result of Capsule.get

##### Capsule.round([property1[,property2,...]])

Converts to float the result of Capsule.get and then rounds the result.

##### Capsule.string([property1[,property2,...]])

Converts to string the result of Capsule.get

##### Capsule.test([property1[,property2,...]])

Converts to boolean the result of Capsule.get

#### Capsule.set(data)

Copies recursively *data*'s own enumerable properties to the internal object, firing events when needed at the watcher. Returns the [Collection](https://www.npmjs.org/package/vz.collection "vz.collection") associated with these events. Events will be fired when as a result of this operation one or more properties of the internal object change. Fired events are the result of joining property names with the dot character, just like properties would be accessed from the internal object, eg 'dog.age'.

#### Capsule.watcher

A [Machine](https://www.npmjs.org/package/vz.machine "vz.machine") where events resulting from Capsule.set will happen.
