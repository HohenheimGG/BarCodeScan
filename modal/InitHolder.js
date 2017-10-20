/**
 * Created by hohenheim on 17/10/20.
 */

import {observable, action} from 'mobx'
import {Component} from 'react';
import {BCSRealm} from 'RealmController';

const LOADING = '数据初始化中...';
const FAILURE = '加载失败';

class InitHolder {
  @observable
  hasInit = false;

  @observable
  title = LOADING;
  
  initRealm(component: Component, afterCallback: Function) {
    console.warn("createInstance");
    BCSRealm.createInstance(component, afterCallback);
  }

  @action
  changeState() {
    this.hasInit = !this.hasInit;
  }

  initFail() {
    this.title = FAILURE;
  }
}

module.exports = InitHolder;