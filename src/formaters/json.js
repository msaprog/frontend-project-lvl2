import _ from 'lodash';

const converterKey = ([key, value]) => ((typeof (value) === 'string') ? `"${key}":"${value}"` : `"${key}":${value}`);

export const formatedJson = (treeIn) => {
  const iter = (coll) => {
    const convertObj = coll.map((itemObj) => `{${Object.entries(itemObj).map((keyValueColl) => {
      const [keyColl, valueColl] = keyValueColl;
      if (_.isArray(valueColl)) { return `"${keyColl}":[${iter(valueColl)}]`; }
      if (_.isObject(valueColl)) { return `"${keyColl}":${iter([valueColl])}`; }
      return converterKey(keyValueColl);
    })}}`);
    return convertObj;
  };
  return `[${iter(treeIn)}]`;
};

export default formatedJson;
