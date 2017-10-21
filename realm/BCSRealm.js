
import {Component} from 'react';
import Realm from 'realm';
import Constant from 'BCSConstant';
import AsyncStorage from 'AsyncStorage';
import NumberUtils from 'NumberUtils';
import ArrayUtils from 'ArrayUtils';
import {InitHolder} from 'BCSHolder';

class BCSRealm {

  // 构造
  constructor(afterCallback: Function) {
    this.realmInstance = undefined;
    this.objects = [];
    this.initDB(afterCallback);
  }

  static mBCSRealm;

  static createInstance(component: Component, afterCallback: Function) {
    BCSRealm.mBCSRealm = new BCSRealm(afterCallback);
    //关闭数据库
    let componentWillUnMount = component.componentWillUnMount;
    component.componentWillUnMount = function() {
      componentWillUnMount && componentWillUnMount.apply(this, arguments);
      BCSRealm.mBCSRealm.close();
    }
  }

  static getInstance() {
    return BCSRealm.mBCSRealm;
  }

  /**
   * 存入数据
   * @param  {String} dbName:   string        [description]
   * @param  {Object} params:   Array        [description]
   * @param  {[type]} beforeCallback: function      [description]
   * @param  {[type]} afterCallback: function      [description]
   * @return {[type]}           [description]
   */
  write(dbName: string = '', params: Array = [], beforeCallback: Function, afterCallback: Function) {
    this.realmInstance.write(() => {
      beforeCallback && beforeCallback();
      for(let i = 0; i < params.length; i ++) {
        let temp = params[i];
        if(temp instanceof Object) {
          console.warn('realm\'s input is not Object');
          break;
        }
        this.realmInstance.create(dbName, ...temp);
      }
      this.objects = [];//重置
      afterCallback && afterCallback();
    })
  }

    /**
     * 加载数据
     * @param dbName
     * @param filter
     * @param beforeCallback
     * @param afterCallback
     * @returns {*}
     */
  load(dbName: string = '', filter: string = '', beforeCallback: Function, afterCallback: Function) {
    beforeCallback && beforeCallback();
      let result;
    if(this.objects.length != 0)
      result = this.objects;
    else if(!filter)
      result = this.realmInstance.objects(dbName);
    else
      result = this.realmInstance.objects(dbName).filtered(filter);
    afterCallback && afterCallback();
    return result;
  }

  /**
   * 初始化
   * @param afterCallback
   */
  initDB(afterCallback: Function) {
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
      this.realmInstance = realm;
      //数据库数据已初始化
      let result = await AsyncStorage.getItem(Constant.IS_INIT);
      if(result == Constant.HAS_INIT) {
        afterCallback && afterCallback(true);
        return;
      }
      //开始初始化数据
      realm.write(_ => {
        for(let i = 0; i < 200000; i ++) {
          let price = NumberUtils.getRandomInt(0, i);
          realm.create(Constant.PRODUCT_INFO_DB, {
            id: i,
            name: `name${i}`,
            description: `num-${i}`,
            price: price,
            code: `${i}-${i}-${price}`
          });
        }
        //初始化数据结束
        AsyncStorage.setItem(Constant.IS_INIT, Constant.HAS_INIT);
        afterCallback && afterCallback(true);
      });
    }).catch(error => {
      console.warn('error: ' + error);
      afterCallback && afterCallback(false);
    });
  }

  /**
   * 关闭数据库
   */
  close() {
    if(!this.realmInstance)
      this.realmInstance.close();
    BCSRealm.mBCSRealm = null;
  }

  remove(index: number) {
    this.realmInstance.write(_ => {
      // let info = this.realmInstance.create(Constant.PRODUCT_INFO_DB, {code: code, id: Number(index)});
      let item = this.objects[index];
      this.realmInstance.delete(item);
      ArrayUtils.remove(this.objects, index);
    });
  }
}


module.exports = BCSRealm;