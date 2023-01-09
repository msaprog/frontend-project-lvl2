import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import { parse } from './parsers.js';
import { chooseFormater } from './formaters/index.js';

const ext = (filePath) => extname(filePath).slice(1);

export const genDiff = (fileName1, fileName2, formatStyle = 'stylish') => {
  const currentDir = process.cwd();
  const file1Path = resolve(currentDir, fileName1);
  const file2Path = resolve(currentDir, fileName2);
  const file1Content = parse(readFileSync(file1Path, 'utf8'), ext(file1Path));
  const file2Content = parse(readFileSync(file2Path, 'utf8'), ext(file2Path));

  const getAstTree = (content1, content2) => {
    const contentKeys1 = _.keys(content1);
    const contentKeys2 = _.keys(content2);
    const sortedKeys = _.sortBy(_.union(contentKeys1, contentKeys2));
    return sortedKeys.map((key) => {
      if (!_.has(content1, key)) {
        return { key, state: 'added', value: content2[key] };
      }
      if (!_.has(content2, key)) {
        return { key, state: 'deleted', value: content1[key] };
      }
      if (_.isObject(content1[key]) && _.isObject(content2[key])) {
        return { key, state: 'nested', value: getAstTree(content1[key], content2[key]) };
      }
      if (!_.isEqual(content1[key], content2[key])) {
        return {
          key, state: 'changed', value1: content1[key], value2: content2[key],
        };
      }
      return { key, state: 'notChanged', value: content1[key] };
    });
  };

  return chooseFormater(getAstTree(file1Content, file2Content), formatStyle);
};

export default genDiff;
