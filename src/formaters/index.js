import { formatedStilish } from './stylish.js';
import { formatedPlain } from './plain.js';
import { formatedJson } from './json.js';

export const chooseFormater = (astTree, format) => {
  switch (format) {
    case 'stylish':
      return formatedStilish(astTree);
    case 'plain':
      return formatedPlain(astTree);
    case 'json':
      return formatedJson(astTree);
    default:
      throw new Error(`Invalid style: '${format}'`);
  }
};

export default chooseFormater;
