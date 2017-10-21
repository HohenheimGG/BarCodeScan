import {Component} from 'react';
import {ScanProductModule} from 'NativeModules';

var NativeEventEmitter = require('Platform').OS === 'android'
	? require('RCTDeviceEventEmitter')
	: require('RCTNativeAppEventEmitter');

const SCAN_RESULT = 'SCAN_RESULT';
const SCAN_CONTENT = 'SCAN_CONTENT';

function openScanPage(component: Component, callback: Function) {
	registerComponentListener(component, callback);
	ScanProductModule.openScanPage();
}

function registerComponentListener(component: Component, callback: Function) {
	component._scanListener_ && component._scanListener_.remove();
	component._scanListener_ = NativeEventEmitter.addListener(SCAN_RESULT, (result)=>{
		callback && callback(result);
	});

	let componentWillUnmount = component.componentWillUnmount;
	component.componentWillUnmount = function() {
		componentWillUnmount && componentWillUnmount.apply(this, arguments);
		component._scanListener_ && component._scanListener_.remove();
	};
}

module.exports = {
	openScanPage
};