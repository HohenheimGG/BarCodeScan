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
  ListView,
  RefreshControl
} from 'react-native';

import BCSNavBar from 'BCSNavBar';
import {load} from 'BCSRealm';
import {ScanProductModule} from 'Common';
import {Grid, SCREEN_WIDTH} from 'Theme';
import {DB_NAME} from 'BCSConstant';

export default class App extends Component<{}> {

  // 构造
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this._renderSeparator = this._renderSeparator.bind(this);
    this._rowHasChanged = this._rowHasChanged.bind(this);
    this._openScanPage = this._openScanPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    // 初始状态
    this.state = {
      isRefresh: false,
      data: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged
      })
    };
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
        rightPress = {this.loadMore}
        rightContent = {'删除'}
        title = {'demo'}
      />
    );
  }

  _renderListView() {
    return (
      <ListView showsVerticalScrollIndicator = {true}
                dataSource = {this.state.data}
                renderRow = {this._renderRow}
                renderSeparator = {this._renderSeparator}
                refreshControl = {
                    <RefreshControl onRefresh = {() => this.refresh()} refreshing = {this.state.isRefresh}/>
                    }/>
    );
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <Text>{`name-${rowData.name}-description-${rowData.description}-price-${rowData.price}`}</Text>
    )
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View style = {{width: Grid.A * 12 - Grid.a * 2, height: 1, backgroundColor: 'black'}}/>
    )
  }

  _rowHasChanged(prevRowData, nextRowData) {
    return prevRowData !== nextRowData;
  }

  refresh() {
    this.changeRefresh(true);
  }

  changeRefresh(refreshing: boolean) {
    this.setState({
      isRefresh: refreshing
    });
  }

  _openScanPage() {
    ScanProductModule.openScanPage()
  }

  loadMore() {
    let result = load(DB_NAME, 'price < 30');
    this.setState({data: this.state.data.cloneWithRows(result)})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    width: Grid.A * 12 - Grid.a * 2,
    height: 1,
    backgroundColor: 'black'
  }
});
