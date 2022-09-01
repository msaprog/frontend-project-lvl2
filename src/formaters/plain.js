import _ from 'lodash';

const stringifyPlain = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

export const formatedPlain = (treeIn) => {
  const iter = (tree, parent) => tree.flatMap((lvl) => {
    const path = [...parent, lvl.key].join('.');
    if (lvl.state === 'added') { return `Property '${path}' was added with value: ${stringifyPlain(lvl.value)}`; }
    if (lvl.state === 'deleted') { return `Property '${path}' was removed`; }
    if (lvl.state === 'notChanged') { return []; }
    if (lvl.state === 'changed') { return `Property '${path}' was updated. From ${stringifyPlain(lvl.value1)} to ${stringifyPlain(lvl.value2)}`; }
    if (lvl.state === 'nested') { return `${iter(lvl.value, [path]).join('\n')}`; }
    throw new Error('Data cannot be formatted!');
  });

  const resultDiff = iter(treeIn, []);
  return [...resultDiff].join('\n');
};

export default formatedPlain;
