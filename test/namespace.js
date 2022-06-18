const JSONInstances = require('../cjs/namespace');

class Some {}
class Other {}
class Test {}

const nmsp = {
  deeper: {
    Some,
    Other,
  },
  Test
};

const {replacer, reviver} = JSONInstances(nmsp);
const str = JSON.stringify([{}, new Some, new Other, new Test], replacer);
console.assert(str === '[{"i":"","o":[]},{"i":"deeper.Some","o":[]},{"i":"deeper.Other","o":[]},{"i":"Test","o":[]}]');

const [a, b, c, d] = JSON.parse(str, reviver);
console.assert(a.constructor === Object);
console.assert(b instanceof Some);
console.assert(c instanceof Other);
console.assert(d instanceof Test);
