import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import { parsers } from './parsers.js';
import { choiceFormaters } from './formaters/index.js';

export const genDiff = (file1, file2, formatStyle = 'stylish') => {
  const currentDir = process.cwd();
  const currentPathF1 = resolve(currentDir, file1);
  const currentPathF2 = resolve(currentDir, file2);
  let ext = extname(currentPathF1).slice(1);
  const file1ContentObj = parsers(readFileSync(currentPathF1, 'utf8'), ext);
  ext = extname(currentPathF2).slice(1);
  const file2ContentObj = parsers(readFileSync(currentPathF2, 'utf8'), ext);

  const getTree = (file1In, file2In) => {
    const file1Keys = _.keys(file1In);
    const file2Keys = _.keys(file2In);
    const sortedKeys = _.sortBy(_.union(file1Keys, file2Keys));
    return sortedKeys.map((key) => {
      if (!_.has(file1In, key)) {
        return { key, state: 'added', value: file2In[key] };
      }
      if (!_.has(file2In, key)) {
        return { key, state: 'deleted', value: file1In[key] };
      }
      if (_.isObject(file1In[key]) && _.isObject(file2In[key])) {
        return { key, state: 'nested', value: getTree(file1In[key], file2In[key]) };
      }
      if (!_.isEqual(file1In[key], file2In[key])) {
        return {
          key, state: 'changed', value1: file1In[key], value2: file2In[key],
        };
      }
      return { key, state: 'notChanged', value: file1In[key] };
    });
  };

  const tempTree = getTree(file1ContentObj, file2ContentObj);
  const formatDiff = choiceFormaters(tempTree, formatStyle);
  return formatDiff;
};

export default genDiff;
