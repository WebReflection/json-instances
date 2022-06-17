'use strict';
/*! (c) Andrea Giammarchi - ISC */

const {isArray} = Array;
const {entries, fromEntries, setPrototypeOf} = Object;

const isObject = o => typeof o === 'object' && o && !isArray(o);

function replacer(_, $) {
  if (!isObject($)) return $;
  const {c, m} = this;
  if (!m.has($)) {
    const v = {i: c.indexOf($.constructor), o: [...entries($)]};
    m.set($, v).set(v, v);
  }
  return m.get($);
}

function reviver(_, $) {
  if (!isObject($)) return $;
  const {c, m} = this;
  if (!m.has($)) {
    const {i, o} = $, v = fromEntries(o);
    m.set($, v).set(v, v);
    if (-1 < i && ('fromJSON' in setPrototypeOf(v, c[i].prototype)))
      v.fromJSON();
  }
  return m.get($);
}

/**
 * @typedef {Object} JSONInstancesHelpers callbacks usable with
 *  `JSON.stringify(any, self.replacer)` and `JSON.parse(string, self.reviver)`.
 * @property {(key: string, value: any) => any} replacer a `JSON.stringify` helper.
 * @property {(key: string, value: any) => any} reviver a `JSON.parse` helper.
 */

/**
 * Given an array of classes / constructors, returns both `replacer` and
 * `reviver` helpers to stringify and revive instances via `JSON`.
 * @param  {...function} constructors one or more constructor that might be found
 *  while serializing any non array, yet object, value.
 * @returns {JSONInstancesHelpers} the object with `replacer` and `reviver` helpers.
 */
module.exports = function() {
  const c = [], context = {c: c.concat.apply(c, arguments), m: new WeakMap};
  return {
    replacer: replacer.bind(context),
    reviver: reviver.bind(context)
  };
};
