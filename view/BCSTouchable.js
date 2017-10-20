/**
 * @providesModule BCSTouchable
 */
import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';

const defaultThrottle = 500;

export default function wrapTouchable(Component) {
  return class TouchableComponent extends Component {
    
    static defaultProps = {
      throttle: defaultThrottle
    };
    constructor(props) {
      super(props);
      this.touchProps = {
        onPress: this._wrapHandle('onPress'),
        onPressIn: this._wrapHandle('onPressIn'),
        onPressOut: this._wrapHandle('onPressOut'),
        onLongPress: this._wrapHandle('onLongPress'),
      };
    }
    _wrapHandle(fnName) {
      let lastTimestamp = 0;
      return e => {
        let timestamp = e.nativeEvent.timeStamp
          ? (e.nativeEvent.timeStamp / 1000000)
          : e.nativeEvent.timestamp;
        if (this.props.throttle && timestamp - lastTimestamp < this.props.throttle) {
          return;
        }
        lastTimestamp = timestamp;
        this.props[fnName] && this.props[fnName](e);
      };
    }
    render() {
      return (
        <Component
          {...this.props}
          {...this.touchProps} />
      );
    }
  };
}


export const BCSTouchableWithoutFeedback = wrapTouchable(TouchableWithoutFeedback);
export const BCSTouchableHighlight = wrapTouchable(TouchableHighlight);
export const BCSTouchableOpacity = wrapTouchable(TouchableOpacity);
export const BCSTouchableNativeFeedback = wrapTouchable(TouchableNativeFeedback);

