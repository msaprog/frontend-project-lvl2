import _ from 'lodash';

const converterKey = ([key, value]) => ((typeof (value) === 'string') ? `"${key}":"${value}"` : `"${key}":${value}`);

const way = (coll) => {
  const convertObj = coll.map((itemObj) => {
    const entries = Object.entries(itemObj);

    const chekKey = entries.map((keyValueColl) => {
      const [keyColl, valueColl] = keyValueColl;
      if (_.isArray(valueColl)) { return `"${keyColl}":[${way(valueColl)}]`; }
      if (_.isObject(valueColl)) { return `"${keyColl}":${way([valueColl])}`; }
      return converterKey(keyValueColl);
    });

    return `{${chekKey}}`;
  });
  return convertObj;
};

export const formatedJson = (treeIn) => {

  return `[${way(treeIn)}]`;
};

export default formatedJson;
