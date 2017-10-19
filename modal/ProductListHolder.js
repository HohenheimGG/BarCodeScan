/**
 * Created by hohenheim on 17/10/19.
 */

import {observable, action} from 'mobx'

class ProductListHolder {

  @observable
  dataList = [];

  @action
  load() {

  }

  @action
  delete() {

  }
  
  loadMore() {
    // let result = load(DB_NAME, 'price < 30');
    // this.setState({data: this.state.data.cloneWithRows(result)})
  }
}

module.exports = ProductListHolder;