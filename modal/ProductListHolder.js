/**
 * Created by hohenheim on 17/10/19.
 */

import {observable, action, computed} from 'mobx'
import BCSRealm from 'BCSRealm';
import Constant from 'BCSConstant';

const LOAD_NUM = 20;

class ProductListHolder {

  startCount = 0;

  @observable
  dataList = [];
  
  @observable
  footLoading = false;

  @observable
  headLoading = false;

  @action
  footLoad() {
    this.footLoading = !this.footLoading;
    this.dataList = [].concat(this.dataList, this.load(this.startCount, this.startCount + LOAD_NUM));
    this.footLoading = !this.footLoading;
    this.startCount += LOAD_NUM;
  }

  @action
  headLoad() {
    this.headLoading = !this.headLoading;
    this.startCount = 0;
    this.dataList = [].concat(this.load(this.startCount, LOAD_NUM));
    this.headLoading = !this.headLoading;
  }

  load(start, end) {
    let result = BCSRealm.load(Constant.PRODUCT_INFO_DB);
    return result.slice(start, end);
  }

  @computed
  get getList() {
    return this.dataList;
  }

  @action
  delete() {

  }
}

module.exports = ProductListHolder;