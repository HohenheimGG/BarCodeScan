/**
 * Created by hohenheim on 17/10/20.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {observer} from 'mobx-react/native'
import {Grid, SCREEN_WIDTH} from 'Theme';

@observer
class ProductInfoItem extends Component {

  render() {
    let rowData = this.props.rowData;
    return (
      <View style = {styles.row}>
        {this._renderRowContent(`name: ${rowData.name}`, `description: ${rowData.description}`)}
        {this._renderRowContent(`price: ${rowData.price}`, `code: ${rowData.code}`)}
      </View>
    )
  }

  _renderRowContent(arg1, arg2) {
    return (
      <View style = {{flexDirection: 'row'}}>
        <Text style = {{width: Grid.a * 20}}>{arg1}</Text>
        <Text style = {{width: Grid.a * 20}}>{arg2}</Text>
      </View>
    );
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
