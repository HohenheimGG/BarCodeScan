/**
 * @providesModule ProductInfoListView
 */

import React, {Component} from 'react';

import {
  StyleSheet,
  ListView,
  View,
  Text,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import {BCSTouchableOpacity as TouchableOpacity} from 'BCSTouchable';

import ProductInfoItem from './ProductInfoItem';

import {observer} from 'mobx-react/native'
import {Grid, SCREEN_WIDTH} from 'Theme';

const LOAD_MORE = '加载更多';

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
    return (
      <ListView
        dataSource = {this.dataSource.cloneWithRows(this.props.productHolder.dataList)}
        removeClippedSubviews = {true}
        enableEmptySections = {true}
        renderRow = {this._renderRow}
        renderSeparator = {this._renderSeparator}
        renderFooter = {this._renderFooter}
        refreshControl = {
                    <RefreshControl
                    onRefresh = {() => this.refresh()}
                    refreshing = {this.props.productHolder.headLoading}/>
                    }/>
    );
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <ProductInfoItem
        rowData = {rowData}
        productHolder = {this.props.productHolder}
        index = {rowID}
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
    if(this.props.productHolder.dataList.length == 0)
      return null;
    return (
      <TouchableOpacity
        style = {[styles.row, styles.center]}
        onPress={this.loadMore}
        disabled = {this.props.productHolder.headLoading}
      >
        <Text>{LOAD_MORE}</Text>
      </TouchableOpacity>
    );
  }

  refresh() {
    this.props.productHolder.headLoad();
  }

  loadMore() {
    this.props.productHolder.footLoad();
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
