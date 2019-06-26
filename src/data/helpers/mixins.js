import _ from "lodash";

export const normalize = (value, maximum) => value / maximum;

export const normalizeOn = (array, key) => {
  const max = _(array).map(key).max();
  const normalizeEl = el => normalize(el[key], max);

  return _(array).setKey(key, normalizeEl).value();
};

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