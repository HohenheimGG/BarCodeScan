/**
 * @providesModule ProductInfoListView
 */

import React, {Component} from 'react';

import {
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

import ProductInfoItem from './ProductInfoItem';

import {observer} from 'mobx-react/native'
import {Grid, SCREEN_WIDTH} from 'Theme';

@observer
class ProductInfoListView extends Component {

  // 构造
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this._renderSeparator = this._renderSeparator.bind(this);
    this._rowHasChanged = this._rowHasChanged.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
    this.refresh = this.refresh.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
  }

  render() {
    let list = this.props.productList.dataList;
    this.dataSource = this.dataSource.cloneWithRows(list);
    console.warn('count: ' + this.dataSource.getRowCount());
    return (
      <ListView
        dataSource = {this.dataSource}
        renderRow = {this._renderRow}
        renderSeparator = {this._renderSeparator}
        renderFooter = {this._renderFooter}
        refreshControl = {
                    <RefreshControl
                    onRefresh = {() => this.refresh()}
                    refreshing = {this.props.productList.headLoading}/>
                    }/>
    );
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    console.log("ReactNativeJS: " + JSON.stringify(rowData));
    return (
      <ProductInfoItem
        rowData = {rowData}
      />
    );
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View style = {styles.separator}/>
    );
  }

  _rowHasChanged(prevRowData, nextRowData) {
    return prevRowData !== nextRowData;
  }

  _renderFooter() {
    if(this.props.productList.dataList.length == 0)
      return null;

    if(!this.props.productList.headLoading) {
      return (
        <TouchableOpacity
          style = {[styles.row, styles.center]}
          onPress={this.loadMore}
        >
          <Text>加载更多</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style = {[styles.row, styles.center]}>
        <ActivityIndicator
          animated={this.props.productList.headLoading}
        />
      </View>
    )
  }

  refresh() {
    this.props.productList.headLoad();
  }

  loadMore() {
    this.props.productList.footLoad();
  }
}

const styles = StyleSheet.create({
  separator: {
    width: Grid.A * 12 - Grid.a * 2,
    height: 1,
    backgroundColor: 'black'
  },
  row: {
    height: Grid.a * 15,
    width: SCREEN_WIDTH,
    paddingLeft: Grid.a * 3,
    paddingRight: Grid.a * 3,
    paddingTop: Grid.a * 2
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = ProductInfoListView;
