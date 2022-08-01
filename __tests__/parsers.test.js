import parsers from '../src/parsers.js';

test('parsers yaml3', () => {
  expect(parsers(`{
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
}`, '.yaml')).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});

test('parsers yaml4', () => {
  expect(parsers(`{
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
}`, '.yaml'))
    .toEqual({ timeout: 20, verbose: true, host: 'hexlet.io' });
});
