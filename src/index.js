import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { parsers } from './parsers.js';
import { getDiffStr } from './getdiffstr.js';

export const genDiff = (file1, file2) => {
  const currentDir = process.cwd();
  const currentPathF1 = resolve(currentDir, file1);
  const currentPathF2 = resolve(currentDir, file2);

  let ext = extname(currentPathF1);
  const file1ContentObj = parsers(readFileSync(currentPathF1, 'utf8'), ext);
  ext = extname(currentPathF2);
  const file2ContentObj = parsers(readFileSync(currentPathF2, 'utf8'), ext);

  return (getDiffStr(file1ContentObj, file2ContentObj));
};

export default genDiff;
