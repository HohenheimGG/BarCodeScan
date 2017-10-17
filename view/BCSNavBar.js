/**
 * @providesModule BCSNavBar
 */

import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
var PropTypes = require('prop-types');

import {Grid, SCREEN_WIDTH} from 'Theme';

const isAndroid = Platform.OS == 'android';
const statusBarHeight = isAndroid ? 0 : 20;
const titleBarHeight = isAndroid ? 56 : 44;

class BCSNavBar extends Component{

  render() {
    return (
      <View style = {styles.container}>
        {this._renderLeft()}
        {this._renderTitle()}
        {this._renderRight()}
      </View>
    );
  }

  _renderLeft() {
    if(!this.props.leftPress)
      return <View/>;
    return (
      <TextWrap onPress = {this.props.leftPress}>
        <Text>
          {this.props.leftContent}
        </Text>
      </TextWrap>
    );
  }

  _renderTitle() {
    return (
      <View style = {styles.textWrap}>
        <Text>
          {this.props.title}
        </Text>
      </View>
    );
  }

  _renderRight() {
    if(!this.props.rightPress)
      return null;
    return (
      <TextWrap onPress = {this.props.rightPress}>
        <Text>
          {this.props.rightContent}
        </Text>
      </TextWrap>
    )
  }
}

class TextWrap extends Component {
  render() {
    return (
      <TouchableOpacity style = {styles.textWrap} onPress={this.props.onPress} activeOpacity={0.5}>
          {this.props.children}
      </TouchableOpacity>
    );
  }
}

BCSNavBar.propTypes = {
  leftPress: PropTypes.func,
  rightPress: PropTypes.func,
  leftContent: PropTypes.string,
  rightContent: PropTypes.string,
  title: PropTypes.string
};

BCSNavBar.defaultProps = {
  leftContent: '',
  title: '',
  rightContent: ''
};

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    height: titleBarHeight,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Grid.a * 3
  },
  textWrap: {
    height: titleBarHeight,
    justifyContent: 'center'
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Grid.a * 2
  }
});

module.exports = BCSNavBar;