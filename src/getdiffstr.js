import _ from 'lodash';

export const getDiffStr = (file1Content, file2Content) => {
  const collKeys1 = Object.keys(file1Content);
  const collKeys2 = Object.keys(file2Content);

  let resultStr = '{\n';

  const collKeys = _.union(collKeys1, collKeys2).sort();

  for (let i = 0; i < collKeys.length; i += 1) {
    if (collKeys1.includes(collKeys[i])) {
      if (collKeys2.includes(collKeys[i])) {
        if (file1Content[collKeys[i]] !== file2Content[collKeys[i]]) {
          resultStr = (`${resultStr}  - ${collKeys[i]}: ${file1Content[collKeys[i]]}\n`);
          resultStr = (`${resultStr}  + ${collKeys[i]}: ${file2Content[collKeys[i]]}\n`);
        } else {
          resultStr = (`${resultStr}    ${collKeys[i]}: ${file1Content[collKeys[i]]}\n`);
        }
      } else {
        resultStr = (`${resultStr}  - ${collKeys[i]}: ${file1Content[collKeys[i]]}\n`);
      }
    } else {
      resultStr = (`${resultStr}  + ${collKeys[i]}: ${file2Content[collKeys[i]]}\n`);
    }
  }
  resultStr = (`${resultStr}}`);
  return resultStr;
};

export default getDiffStr;
