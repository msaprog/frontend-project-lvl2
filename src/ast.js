import _ from 'lodash';

export const getAst = (content1, content2) => {
  const contentKeys1 = _.keys(content1);
  const contentKeys2 = _.keys(content2);
  const sortedKeys = _.sortBy(_.union(contentKeys1, contentKeys2));
  return sortedKeys
    .map((key) => {
      if (!_.has(content1, key)) {
        return { key, state: 'added', value: content2[key] };
      }
      if (!_.has(content2, key)) {
        return { key, state: 'deleted', value: content1[key] };
      }
      if (_.isObject(content1[key]) && _.isObject(content2[key])) {
        return { key, state: 'nested', value: getAst(content1[key], content2[key]) };
      }
      if (!_.isEqual(content1[key], content2[key])) {
        return {
          key, state: 'changed', value1: content1[key], value2: content2[key],
        };
      }
      return { key, state: 'notChanged', value: content1[key] };
    });
};

export default getAst;
