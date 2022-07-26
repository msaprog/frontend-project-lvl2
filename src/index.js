import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

export const genDiff = (file1, file2) => {
  let resultKeys = '{\n';

  const currentDir = process.cwd();
  const currentPathF1 = path.resolve(currentDir, file1);
  const currentPathF2 = path.resolve(currentDir, file2);

  if ((path.extname(currentPathF1)) && (path.extname(currentPathF2)) === '.json') {
    const file1ContentObj = JSON.parse(readFileSync(currentPathF1, 'utf8'));
    const file2ContentObj = JSON.parse(readFileSync(currentPathF2, 'utf8'));
    const file1Keys = Object.keys(file1ContentObj);
    const file2Keys = Object.keys(file2ContentObj);

    const collKeys = _.union(file1Keys, file2Keys).sort();

    const Temp = collKeys.filter((key) => {
      if (file1Keys.includes(key)) {
        if (file2Keys.includes(key)) {
          if (file1ContentObj[key] !== file2ContentObj[key]) {
            resultKeys = (`${resultKeys}  - ${key}: ${file1ContentObj[key]}\n`);
            resultKeys = (`${resultKeys}  + ${key}: ${file2ContentObj[key]}\n`);
          } else {
            resultKeys = (`${resultKeys}    ${key}: ${file1ContentObj[key]}\n`);
          }
        } else {
          resultKeys = (`${resultKeys}  - ${key}: ${file1ContentObj[key]}\n`);
        }
      } else {
        resultKeys = (`${resultKeys}  + ${key}: ${file2ContentObj[key]}\n`);
      }
      return true;
    });
    resultKeys = (`${resultKeys}}`);
  }
  console.log(resultKeys);
  return resultKeys;
};

export default genDiff;
