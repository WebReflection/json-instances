# json-instances

[![build status](https://github.com/WebReflection/json-instances/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/json-instances/actions) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/json-instances/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/json-instances?branch=main) [![CSP strict](https://webreflection.github.io/csp/strict.svg)](https://webreflection.github.io/csp/#-csp-strict)

<sup>**Social Media Photo by [Francisco J. Villena](https://unsplash.com/@villena_francis) on [Unsplash](https://unsplash.com/)**</sup>

A minimalistic yet efficient way to stringify and revive instances via JSON.

```js
import JSONInstances from 'json-instances';

class MyThing {
  constructor(thing) {
    this.some = thing;
  }
  toString() {
    return this.some;
  }
}

class OtherThing {
  constructor() {
    this.revived = false;
  }
  fromJSON() {
    this.revived = true;
  }
}

// pass along any constructor that should survive JSON serialization
// and remember that order matters, as constructors are indexed!
const {replacer, reviver} = JSONInstances(MyThing, OtherThing);

const before = [
  new MyThing('cool!'),
  new OtherThing
];

const str = JSON.stringify(before, replacer);
console.log(str);
// [{"i":0,"o":[["some","cool!"]]},{"i":1,"o":[["revived",false]]}]

const after = JSON.parse(str, reviver);
console.log(after);
// [ MyThing { some: 'cool!' }, OtherThing { revived: true } ]
```