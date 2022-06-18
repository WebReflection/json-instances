const JSONInstances = require('../cjs');

class MyThing {
  constructor(b) {
    this.b = b;
  }
  toString() {
    return this.b;
  }
}

const str = JSON.stringify([{a:1}, new MyThing(2), ['c', 3], {i: 4, o: []}], JSONInstances(MyThing).replacer);
console.assert(str === '[{"i":-1,"o":[["a",1]]},{"i":0,"o":[["b",2]]},["c",3],{"i":-1,"o":[["i",4],["o",[]]]}]');

const arr = JSON.parse(str, JSONInstances(MyThing).reviver);
console.assert(arr[1] instanceof MyThing);
console.assert(JSON.stringify(arr) === '[{"a":1},{"b":2},["c",3],{"i":4,"o":[]}]');

class OtherThing {
  constructor() {
    this.revived = false;
  }
  fromJSON() {
    this.revived = true;
  }
}

let {replacer, reviver} = JSONInstances(...[OtherThing]);
let revived = JSON.parse(JSON.stringify(new OtherThing, replacer), reviver);
console.assert(revived instanceof OtherThing);
console.assert(revived.revived === true);

({replacer, reviver} = JSONInstances([OtherThing]));
revived = JSON.parse(JSON.stringify(new OtherThing, replacer), reviver);
console.assert(revived instanceof OtherThing);
console.assert(revived.revived === true);

require('./namespace.js');
