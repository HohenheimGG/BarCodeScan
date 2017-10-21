/**
 * Created by hohenheim on 17/10/19.
 */

import {observable, action, computed} from 'mobx'
import {BCSRealm} from 'RealmController';
import Constant from 'BCSConstant';

const LOAD_NUM = 20;

class ProductListHolder {

  // 构造
  constructor() {
    this.startCount = 0;
  }

  @observable
  dataList = [];
  
  @observable
  footLoading = false;

  @observable
  headLoading = false;

  @action
  footLoad() {
    this.footLoading = !this.footLoading;
    this.dataList = this.dataList.concat(this.load(this.startCount, this.startCount + LOAD_NUM));
    this.footLoading = !this.footLoading;
    this.startCount += LOAD_NUM;
  }

  @action
  headLoad() {
    this.headLoading = !this.headLoading;
    this.startCount = 0;
    this.dataList = [].concat(this.load(this.startCount, LOAD_NUM));
    this.headLoading = !this.headLoading;
    this.startCount = LOAD_NUM;
  }

  load(start, end) {
    let result = BCSRealm.getInstance().load(Constant.PRODUCT_INFO_DB);
    return result.slice(start, end);
  }

  @action
  remove(index: number) {
    this.dataList = BCSRealm.getInstance().remove(index);
  }
}

module.exports = ProductListHolder;