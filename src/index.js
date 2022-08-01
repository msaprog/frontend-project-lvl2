import { readFileSync } from 'fs';
import _ from 'lodash';
import { resolve, extname } from 'path';
import { parsers } from './parsers.js';

export const genDiff = (file1, file2) => {
  const currentDir = process.cwd();
  const currentPathF1 = resolve(currentDir, file1);
  const currentPathF2 = resolve(currentDir, file2);

  let ext = extname(currentPathF1);
  const file1ContentObj = parsers(readFileSync(currentPathF1, 'utf8'), ext);
  ext = extname(currentPathF2);
  const file2ContentObj = parsers(readFileSync(currentPathF2, 'utf8'), ext);

  const file1Keys = Object.keys(file1ContentObj);
  const file2Keys = Object.keys(file2ContentObj);

  const collKeys = _.union(file1Keys, file2Keys).sort();

  let resultKeys = '{\n';
  for (let i = 0; i < collKeys.length; i += 1) {
    if (file1Keys.includes(collKeys[i])) {
      if (file2Keys.includes(collKeys[i])) {
        if (file1ContentObj[collKeys[i]] !== file2ContentObj[collKeys[i]]) {
          resultKeys = (`${resultKeys}  - ${collKeys[i]}: ${file1ContentObj[collKeys[i]]}\n`);
          resultKeys = (`${resultKeys}  + ${collKeys[i]}: ${file2ContentObj[collKeys[i]]}\n`);
        } else {
          resultKeys = (`${resultKeys}    ${collKeys[i]}: ${file1ContentObj[collKeys[i]]}\n`);
        }
      } else {
        resultKeys = (`${resultKeys}  - ${collKeys[i]}: ${file1ContentObj[collKeys[i]]}\n`);
      }
    } else {
      resultKeys = (`${resultKeys}  + ${collKeys[i]}: ${file2ContentObj[collKeys[i]]}\n`);
    }
  }
  return (`${resultKeys}}`);
};

export default genDiff;
