import { getDiffStr } from '../src/getdiffstr.js';

test('getDiffStr', () => {
  expect(getDiffStr(
    {
      host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false,
    },
    { timeout: 20, verbose: true, host: 'hexlet.io' },
  ))
    .toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
