/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import BCSNavBar from 'BCSNavBar';
import ProductInfoListView from 'ProductInfoListView';

import {
  ScanProductModule
} from 'Common';
import {
  Grid,
  SCREEN_WIDTH
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
    this._backup = this._backup.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        {[
        this._renderNavBar(),
        this._renderListView()
        ]}
      </View>
    );
  }

  _renderNavBar() {
    return (
      <BCSNavBar
        leftPress = {this._openScanPage}
        leftContent = {'扫描'}
        rightPress = {this._backup}
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

  _backup() {
    ScanProductModule.backupDB();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
