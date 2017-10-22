
import {observable, action} from 'mobx'
import {Component} from 'react';
import {BCSRealm} from 'RealmController';

const LOADING = '    数据初始化中 \n' +
                '第一次加载会较慢\n' +
                '        请稍等    ';
const FAILURE = '加载失败';

class InitHolder {
  @observable
  hasInit = false;

  @observable
  title = LOADING;

	/**
   * 初始化数据库
   * @param component
   * @param afterCallback
   */
  initRealm(component: Component, afterCallback: Function) {
    BCSRealm.createInstance(component, afterCallback);
  }


  @action
  changeState() {
    this.hasInit = !this.hasInit;
  }

	/**
   * 加载失败
   */
  @action
  initFail() {
    this.title = FAILURE;
  }
}

module.exports = InitHolder;