import { formatedStilish } from './stylish.js';
import { formatedPlain } from './plain.js';
import { formatedJson } from './json.js';

export const choiceFormaters = (diffIn, formaters) => {
  switch (formaters) {
    case 'stylish':
      return formatedStilish(diffIn);
    case 'plain':
      return formatedPlain(diffIn);
    case 'json':
      return formatedJson(diffIn);
    default:
      throw new Error(`Invalid style: '${formaters}'`);
  }
};

export default choiceFormaters;
