import _ from 'lodash';

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const indentKey = replacer.repeat(spacesCount + 1);
  const indentNest = replacer.repeat(spacesCount);
  const keys = Object.entries(value)
    .map(([keyColl, valueColl]) => `${indentKey}${keyColl}: ${stringify(valueColl, replacer, spacesCount + 1)}`);
  return ['{', ...keys, `${indentNest}}`].join('\n');
};

const prefix = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

export const formatStilish = (ast, replacer = '    ') => {
  const iter = (tree, countLvl) => tree
    .map((lvl) => {
      const indentNest = replacer.repeat(countLvl);
      const indentKey = indentNest.slice(2);

      const str = (date, pref) => `${indentKey}${pref} ${lvl.key}: ${stringify(date, replacer, countLvl)}`;

      switch (lvl.state) {
        case 'added':
          return str(lvl.value, prefix.added);
        case 'deleted':
          return str(lvl.value, prefix.deleted);
        case 'notChanged':
          return str(lvl.value, prefix.unchanged);
        case 'changed':
          return (`${str(lvl.value1, prefix.deleted)}\n${str(lvl.value2, prefix.added)}`);
        case 'nested':
          return (`${indentNest}${lvl.key}: ${['{', ...iter(lvl.value, countLvl + 1), `${indentNest}}`].join('\n')}`);
        default:
          throw new Error('Data cannot be formatted!');
      }
    });

  const resultDiff = iter(ast, 1);
  return ['{', ...resultDiff, '}'].join('\n');
};

export default formatStilish;
