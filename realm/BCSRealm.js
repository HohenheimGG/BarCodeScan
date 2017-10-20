/**
 * @providesModule BCSRealm
 */

import {Component} from 'react';
import Realm from 'realm';
import Constant from 'BCSConstant';
import AsyncStorage from 'AsyncStorage';
import NumberUtils from 'NumberUtils';

var bcsRealm;
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
  let result;
  if(!filter)
    result = bcsRealm.objects(dbName);
  else
    result = bcsRealm.objects(dbName).filtered(filter);
  console.log("ReactNativeJS: " + result);
  afterCallback && afterCallback();
  return result;
}

/**
 * 初始化
 * @return {[type]} [description]
 */
function initRealm(component: Component, afterCallback: Function) {
  let realmSchema = {
    name: Constant.PRODUCT_INFO_DB,
    primaryKey:'id',
    properties: {
      id: 'int',
      name: 'string',
      code: 'string',
      description: 'string',
      price: 'int'
    }
  };
  Realm.open({schema: [realmSchema]}).then(async realm => {
    bcsRealm = realm;
    //数据库数据已初始化
    let result = await AsyncStorage.getItem(Constant.IS_INIT);
    if(result == Constant.HAS_INIT) {
      afterCallback && afterCallback(true);
      return;
    }
    //开始初始化数据
    realm.write(_ => {
      console.warn('writing');
      for(let i = 0; i < 200000; i ++)
        realm.create(Constant.PRODUCT_INFO_DB, {
          id: i,
          name: `name${i}`,
          code: `name-${i}-num${i}-price-${i}`,
          description: `num-${i}`,
          price: NumberUtils.getRandomInt(0, i)
        });
      //初始化数据结束
      AsyncStorage.setItem(Constant.IS_INIT, Constant.HAS_INIT);
      afterCallback && afterCallback(true);
    });
  }).catch(error => {
    console.warn('error: ' + error);
    afterCallback && afterCallback(false);
  }).finally(_ => {
    //关闭数据库
    let componentWillUnMount = component.componentWillUnMount;
    component.componentWillUnMount = function() {
      componentWillUnMount && componentWillUnMount.apply(this, arguments);
      close();
    }
  });
}

/**
 * 关闭数据库
 */
function close() {
  if(!bcsRealm)
    bcsRealm.close();
}

module.exports = {
  write,
  load,
  close,
  initRealm
};
