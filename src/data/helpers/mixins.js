import _ from "lodash";

/**
 * @param {number} value
 * @param {number} maximum the max value in the set
 * @returns {number} value as a percentage from zero to the maximum
 */
export const normalize = (value, maximum) => value / maximum;

/**
 * Given a collection normalize a set key of each element.
 * Essentially scale a key of each element to 0-1
 * @param {collection} array
 * @param {string} key
 * @returns {collection}
 */
export const normalizeOn = (array, key) => {
  const max = _(array).map(key).max();
  const normalizeEl = el => normalize(el[key], max);

  return _(array).setKey(key, normalizeEl).value();
};

/**
 * Given a collection create a new key on each element
 * provided by the return value of a function that takes
 * the element as a parameter.
 * @param {array} array
 * @param {string} key
 * @param {function} f
 * @returns {array}
 */
export const setKey = (array, key, f) => {
  return array.map(el => {
    el[key] = f(el);
    return el;
  });
};


_.mixin({
  normalize,
  normalizeOn,
  setKey
});