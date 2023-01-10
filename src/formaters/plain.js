import _ from 'lodash';

const stringifyPlain = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

export const formatedPlain = (astTree) => {
  const iter = (tree, parent) => tree
    .flatMap((lvl) => {
      const path = [...parent, lvl.key].join('.');

      switch (lvl.state) {
        case 'added':
          return `Property '${path}' was added with value: ${stringifyPlain(lvl.value)}`;
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'notChanged':
          return [];
        case 'changed':
          return `Property '${path}' was updated. From ${stringifyPlain(lvl.value1)} to ${stringifyPlain(lvl.value2)}`;
        case 'nested':
          return `${iter(lvl.value, [path]).join('\n')}`;
        default:
          throw new Error('Data cannot be formatted!');
      }
    });

  const resultDiff = iter(astTree, []);
  return [...resultDiff].join('\n');
};

export default formatedPlain;
