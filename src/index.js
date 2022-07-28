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

    resultKeys = (`${resultKeys}}`);
  }
  console.log(resultKeys);
  return resultKeys;
};

export default genDiff;
