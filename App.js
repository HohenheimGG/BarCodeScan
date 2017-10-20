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

import BCSNavBar from 'BCSNavBar';
import ProductInfoListView from 'ProductInfoListView';
import {initRealm} from 'BCSRealm';

import {
  ScanProductModule
} from 'Common';
import {
  Grid,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from 'Theme';
import {
  ProductListHolder
} from 'BCSHolder';


export default class App extends Component<{}> {

  // 构造
  constructor(props) {
    super(props);
    this.productHolder = new ProductListHolder();
    this._openScanPage = this._openScanPage.bind(this);
    this.state = {
      hasInit: false
    }
  }

  componentDidMount() {
    initRealm(this, result => {
      this.setState({
        hasInit: true
      })
    });
  }

  render() {
    if(!this.state.hasInit) {
      return (
        <View style = {styles.loadingContainer}>
          <Text>数据初始化中...</Text>
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
