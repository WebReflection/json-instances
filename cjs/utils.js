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
exports.replacer = replacer

function reviver(I, _, $) {
  if (!isObject($)) return $;
  const {c, m} = this;
  if (!m.has($)) {
    const {i, o} = $, v = fromEntries(o);
    m.set($, v).set(v, v);
    if (I !== i && ('fromJSON' in setPrototypeOf(v, c[i].prototype)))
      v.fromJSON();
  }
  return m.get($);
}
exports.reviver = reviver
