/**
 * @providesModule BCSRealm
 */

import Realm from 'realm';
import Constant from 'BCSConstant';

var bcsRealm;
__init__();
/**
 * 存入数据
 * @param  {String} dbName:   string        [description]
 * @param  {Object} params:   Array        [description]
 * @param  {[type]} beforeCallback: function      [description]
 * @param  {[type]} afterCallback: function      [description]
 * @return {[type]}           [description]
 */
function write(dbName: string = '', params: Array = [], beforeCallback: Function, afterCallback: Function) {
    bcsRealm.write(() => {
        beforeCallback && beforeCallback();
        for(let i = 0; i < params.length; i ++) {
            let temp = params[i];
            if(temp instanceof Object) {
                console.warn('realm\'s input is not Object');
                break;
            }
            bcsRealm.create(dbName, ...temp);
        }
        afterCallback && afterCallback();
    })
}

function load(dbName: string = '', filter: string = '', beforeCallback: Function, afterCallback: Function) {
  beforeCallback && beforeCallback();
  let result = bcsRealm.objects(dbName).filtered(filter);
  afterCallback && afterCallback();
  return result;
}

/**
 * 初始化
 * @return {[type]} [description]
 */
function __init__() {
    let realmSchema = {
        name: Constant.DB_NAME,
        primaryKey:'id',
        properties: {
            id: 'int',
            name: 'string',
            code: 'string',
            description: 'string',
            price: 'int'
        }
    };
    Realm.open({schema: [realmSchema]}).then(realm => {
        bcsRealm = realm;
        realm.write(_ => {
          for(let i = 0; i < 200000; i ++)
            realm.create(Constant.DB_NAME, {
              id: i,
              name: `name${i}`,
              code: `name-${i}-num${i}-price-${i}`,
              description: `num-${i}`,
              price: getRandomInt(0, i)
            });
          console.warn('finish init');
        });
    }).catch(error => {
      console.warn('error: ' + error);
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    write,
    load
};
