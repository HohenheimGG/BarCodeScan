/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import {observer} from 'mobx-react/native'

import BCSNavBar from 'BCSNavBar';
import ProductInfoListView from 'ProductInfoListView';

import {
  ScanProductModule
} from 'Common';
import {
  Grid,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from 'Theme';
import {
  ProductListHolder,
  InitHolder
} from 'BCSHolder';

@observer
export default class App extends Component<{}> {

  // 构造
  constructor(props) {
    super(props);
    this.productHolder = new ProductListHolder();
    this.initHolder = new InitHolder();
    this._openScanPage = this._openScanPage.bind(this);
    this.afterCall = this.afterCall.bind(this);
  }

  componentDidMount() {
    this.initHolder.initRealm(this, this.afterCall);
  }

  afterCall(result)  {
    console.warn('result: ' + result);
    if(!result) {
      this.initHolder.initFail();
      return;
    }
    this.productHolder.headLoad();
    this.initHolder.changeState();
  }

  render() {
    let hasInit = this.initHolder.hasInit;
    if(!hasInit) {
      return (
        <View style = {styles.loadingContainer}>
          <Text>{this.initHolder.title}</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this._renderNavBar()}
        {this._renderListView()}
      </View>
    );
  }

  _renderNavBar() {
    return (
      <BCSNavBar
        leftPress = {this._openScanPage}
        leftContent = {'扫描'}
        rightPress = {_ => {}}
        rightContent = {'删除'}
        title = {'demo'}
      />
    );
  }

  _renderListView() {
    return (
      <ProductInfoListView
        productList = {this.productHolder}
      />
    );
  }

  _openScanPage() {
    ScanProductModule.openScanPage()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
