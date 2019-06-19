import _ from "lodash";

const normalize = (value, maximum) => value / maximum;

const normalizeOn = (array, key) => {
  const max = _(array).map("relative_value").max();

  return _(array).map(el =>
    _(el).set(key, normalize(el[key], max)).value()
  ).value();
};

const setKey = (array, key, f) => {
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