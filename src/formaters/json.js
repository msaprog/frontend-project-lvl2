import _ from 'lodash';

const convertedKey = ([key, value]) => ((typeof (value) === 'string') ? `"${key}":"${value}"` : `"${key}":${value}`);

export const formatedJson = (astTree) => {
  const iter = (coll) => coll.map((itemObj) => `{${Object.entries(itemObj)
    .map((keyValueColl) => {
      const [keyColl, valueColl] = keyValueColl;
      if (_.isArray(valueColl)) { return `"${keyColl}":[${iter(valueColl)}]`; }
      if (_.isObject(valueColl)) { return `"${keyColl}":${iter([valueColl])}`; }
      return convertedKey(keyValueColl);
    })}}`);
  return `[${iter(astTree)}]`;
};

export default formatedJson;
