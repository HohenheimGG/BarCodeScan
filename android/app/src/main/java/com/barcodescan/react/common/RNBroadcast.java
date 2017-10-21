package com.barcodescan.react.common;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by hohenheim on 2017/10/22.
 */

public class RNBroadcast {

    public static void sendEvent(ReactContext context, String action, WritableMap params) {
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(action, params);
    }
}
