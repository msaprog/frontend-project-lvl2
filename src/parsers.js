import yaml from 'js-yaml';

export const parse = (date, ext) => {
  switch (ext) {
    case 'json':
      return JSON.parse(date);
    case 'yml':
    case 'yaml':
      return yaml.load(date);
    default:
      throw new Error(`Invalid file extension: '${ext}'! Try supported formats.`);
  }
};

export default parse;
