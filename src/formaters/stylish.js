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

export const formatedStilish = (astTree, replacer = '    ') => {
  const iter = (tree, countLvl) => tree
    .map((lvl) => {
      const indentNest = replacer.repeat(countLvl);
      const indentKey = indentNest.slice(2);
      const str = (date, pref) => `${indentKey}${pref} ${lvl.key}: ${stringify(date, replacer, countLvl)}`;
      if (lvl.state === 'added') { return str(lvl.value, prefix.added); }
      if (lvl.state === 'deleted') { return str(lvl.value, prefix.deleted); }
      if (lvl.state === 'notChanged') { return str(lvl.value, prefix.unchanged); }
      if (lvl.state === 'changed') { return (`${str(lvl.value1, prefix.deleted)}\n${str(lvl.value2, prefix.added)}`); }
      if (lvl.state === 'nested') { return (`${indentNest}${lvl.key}: ${['{', ...iter(lvl.value, countLvl + 1), `${indentNest}}`].join('\n')}`); }
      throw new Error('Data cannot be formatted!');
    });

  const resultDiff = iter(astTree, 1);
  return ['{', ...resultDiff, '}'].join('\n');
};

export default formatedStilish;
