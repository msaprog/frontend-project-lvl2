import { formatedStilish } from './stylish.js';
import { formatedPlain } from './plain.js';

export const choiceFormaters = (diffIn, formaters) => {
  switch (formaters) {
    case 'stylish':
      return formatedStilish(diffIn);
    case 'plain':
      return formatedPlain(diffIn);
    default:
      throw new Error(`Invalid style: '${formaters}'`);
  }
};

export default choiceFormaters;
