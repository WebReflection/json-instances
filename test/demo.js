const JSONInstances = require('../cjs');

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
