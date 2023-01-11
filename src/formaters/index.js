import { formatStilish } from './stylish.js';
import { formatPlain } from './plain.js';
import { formatJson } from './json.js';

export const compareFiles = (ast, format) => {
  switch (format) {
    case 'stylish':
      return formatStilish(ast);
    case 'plain':
      return formatPlain(ast);
    case 'json':
      return formatJson(ast);
    default:
      throw new Error(`Invalid style: '${format}'`);
  }
};

export default compareFiles;
