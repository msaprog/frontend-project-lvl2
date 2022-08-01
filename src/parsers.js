import yaml from 'js-yaml';

export const parsers = (date, ext) => {
  if (ext === '.json') {
    return JSON.parse(date);
  } if (ext === ('.yaml' || '.yml')) {
    return yaml.load(date);
  }
  return -1;
};

export default parsers;
