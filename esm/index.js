import {replacer, reviver} from './utils.js';

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
export default function() {
  const c = [], context = {c: c.concat.apply(c, arguments), m: new WeakMap};
  return {
    replacer: replacer.bind(context),
    reviver: reviver.bind(context, -1)
  };
};
