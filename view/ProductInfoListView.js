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
  RefreshControl
} from 'react-native';

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
    this.ds = new ListView.DataSource({
      rowHasChanged: this._rowHasChanged
    });
    this.state = {
      isRefresh: false
    }
  }

  render() {
    return (
      <ListView showsVerticalScrollIndicator = {true}
                enableEmptySections={true}
                initialListSize = {10}
                dataSource = {this.ds.cloneWithRows(this.props.productList.dataList)}
                renderRow = {this._renderRow}
                renderSeparator = {this._renderSeparator}
                refreshControl = {
                    <RefreshControl onRefresh = {() => this.refresh()} refreshing = {!!this.state.isRefresh}/>
                    }/>
    );
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View key = {rowID}style = {styles.row}>
        <View style = {{flexDirection: 'row'}}>
          <Text style = {{width: Grid.a * 20}}>{`name: ${rowData.name}`}</Text>
          <Text style = {{width: Grid.a * 20}}>{`description: ${rowData.description}`}</Text>
        </View>
        <View style = {{flexDirection: 'row', paddingTop: Grid.a * 2}}>
          <Text style = {{width: Grid.a * 20}}>{`price: ${rowData.price}`}</Text>
          <Text style = {{width: Grid.a * 29}}>{`code: ${rowData.code}`}</Text>
        </View>
      </View>
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
    paddingTop: Grid.a * 2
  }
});

module.exports = ProductInfoListView;
