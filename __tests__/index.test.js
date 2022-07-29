import { genDiff } from '../src/index.js';

if (genDiff('__fixtures__/file1.json', '__fixtures__/file2.json') !== `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`) {
  throw new Error('Функция работает неверно!');
}

console.log('Все тесты пройдены!');

test('gendiff', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(`{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }`);
  //expect(reverse('')).toEqual('');
});
