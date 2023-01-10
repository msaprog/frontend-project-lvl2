import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { parse } from './parsers.js';
import { compareFiles } from './formaters/index.js';
import { getAstTree } from './astTree.js';

const getContentFile = (fileName) => {
  const currentDir = process.cwd();
  const filePath = resolve(currentDir, fileName);
  const fileExt = extname(filePath).slice(1);
  return parse(readFileSync(filePath, 'utf8'), fileExt);
};

export const genDiff = (fileName1, fileName2, formatStyle = 'stylish') => compareFiles(getAstTree(getContentFile(fileName1), getContentFile(fileName2)), formatStyle);

export default genDiff;
