/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import BCSNavBar from 'BCSNavBar';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <BCSNavBar
          leftPress = {_ => {}}
          leftContent = {'扫描'}
          rightPress = {_ => {}}
          rightContent = {'删除'}
          title = {'demo'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
