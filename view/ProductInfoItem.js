/**
 * Created by hohenheim on 17/10/20.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';
import {BCSTouchableOpacity as TouchableOpacity} from 'BCSTouchable';
import {observer} from 'mobx-react/native'
import {Grid, SCREEN_WIDTH} from 'Theme';

@observer
class ProductInfoItem extends Component {

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.remove = this.remove.bind(this);
  }

  render() {
    let rowData = this.props.rowData;
    return (
      <TouchableOpacity
        style = {styles.row}
        onLongPress = {this._onPress}
      >
        {this._renderRowContent(`name: ${rowData.name}`, `description: ${rowData.description}`)}
        {this._renderRowContent(`price: ${rowData.price}`, `code: ${rowData.code}`)}
      </TouchableOpacity>
    )
  }

  _renderRowContent(arg1, arg2) {
    return (
      <View
        style = {{flexDirection: 'row'}}
      >
        <Text style = {{width: Grid.a * 20}}>{arg1}</Text>
        <Text style = {{width: Grid.a * 20}}>{arg2}</Text>
      </View>
    );
  }

  _onPress() {
    Alert.alert('提示',
      '删除数据',
      [{
        text: '删除', onPress: this.remove
      }, {
        text: '取消'
      }],
      {cancelable: false}
    );
  }

  remove() {
    this.props.productHolder.remove(this.props.index);
  }

}

const styles = StyleSheet.create({
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

module.exports = ProductInfoItem;
