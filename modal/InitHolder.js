/**
 * Created by hohenheim on 17/10/20.
 */

import {Component} from 'react';
import {observable, action} from 'mobx'
import {initRealm} from 'BCSRealm';

class InitHolder {
  @observable
  hasInit = false;

  @action
  initRealm(component: Component) {
    initRealm(component, this);
  }

  @action
  changeState() {
    this.hasInit = !this.hasInit;
  }
}

module.exports = InitHolder;