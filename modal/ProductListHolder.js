
import {observable, action, computed} from 'mobx'
import {BCSRealm} from 'RealmController';
import Constant from 'BCSConstant';
import ArrayUtils from 'ArrayUtils';
import ToastAndroid from 'ToastAndroid';

const LOAD_NUM = 20;
const SCAN_CONTENT = 'SCAN_CONTENT';
const DATA_ERROR = '商品二维码格式错误, 添加失败';
const DATA_REPEAT = '该商品二维码已存在于数据库';
const INSERT_SUCCESS = '添加成功';

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

	/**
   * 上拉加载
   */
  @action
  footLoad() {
    this.footLoading = !this.footLoading;
    this.dataList = this.dataList.concat(this.load(this.startCount, this.startCount + LOAD_NUM));
    this.footLoading = !this.footLoading;
    this.startCount += LOAD_NUM;
  }

	/**
   * 下拉刷新
   */
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

	/**
   * 删除
   * @param index
   */
  @action
  remove(index: number) {
    BCSRealm.getInstance().remove(Constant.PRODUCT_INFO_DB, index);
    if(index == 0)
      this.dataList = this.dataList.slice(1, this.dataList.length);
    else if(index = this.dataList.length - 1)
      this.dataList = this.dataList.slice(0, this.dataList.length);
    else
      this.dataList = this.dataList.slice(0, index).concat(this.dataList.slice(index + 1, this.dataList.length));
  }

	/**
   * 插入数据
   * @param result
   */
  insert(result: Object) {
    let code = result[SCAN_CONTENT];
    let list = code.split('-');
    if(list.length < 3) {
      ToastAndroid && ToastAndroid.show(DATA_ERROR, ToastAndroid.SHORT);
      return;
    }
    let params = {
      id: BCSRealm.getInstance().tempList.length + 1,
      name: list[0],
      description: list[1],
      price: list[2],
      code: code
    };
    console.warn('result: ' + JSON.stringify(params));
    BCSRealm.getInstance().write(
      Constant.PRODUCT_INFO_DB,
      params,
      undefined,
      result => {
        if(result == Constant.INSERT_REPEAT) {
          ToastAndroid && ToastAndroid.show(DATA_REPEAT, ToastAndroid.SHORT);
        } else {
          ToastAndroid && ToastAndroid.show(INSERT_SUCCESS, ToastAndroid.SHORT);
        }
    });
  }
}

module.exports = ProductListHolder;