'use strict';
const {replacer, reviver} = require('./utils.js');

const {entries} = Object;
const crawl = (nmsp, map, path) => {
  for (const [key, value] of entries(nmsp)) {
    const keys = path.concat(key);
    if (typeof value === 'function') {
      const found = keys.join('.');
      map.set(value, found);
      map.set(found, value);
    }
    else
      crawl(value, map, keys);
  }
};

/**
 * @typedef {Object} JSONInstancesHelpers callbacks usable with
 *  `JSON.stringify(any, self.replacer)` and `JSON.parse(string, self.reviver)`.
 * @property {(key: string, value: any) => any} replacer a `JSON.stringify` helper.
 * @property {(key: string, value: any) => any} reviver a `JSON.parse` helper.
 */

/**
 * Given an array of classes / constructors, returns both `replacer` and
 * `reviver` helpers to stringify and revive instances via `JSON`.
 * @param  {object} nmsp a namespace where all classes can be found.
 * @returns {JSONInstancesHelpers} the object with `replacer` and `reviver` helpers.
 */
module.exports = function(nmsp) {
  const path = new Map;
  crawl(nmsp, path, []);
  const indexOf = constructor => (path.get(constructor) || '');
  const context = {
    c: new Proxy(path, {
      get: (_, key) => (key === 'indexOf' ? indexOf : path.get(key))
    }),
    m: new WeakMap
  };
  return {
    replacer: replacer.bind(context),
    reviver: reviver.bind(context, '')
  };
};
