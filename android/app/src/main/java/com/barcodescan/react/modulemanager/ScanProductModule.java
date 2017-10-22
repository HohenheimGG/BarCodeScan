package com.barcodescan.react.modulemanager;

import android.content.Intent;

import com.barcodescan.R;
import com.barcodescan.react.common.RNBroadcast;
import com.barcodescan.react.controller.ScanProductController;
import com.barcodescan.realm.RealmMigration;
import com.barcodescan.zxing.CaptureActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class ScanProductModule extends ReactContextBaseJavaModule{

    private static final String MODULE_NAME = "ScanProductModule";
    private ReactApplicationContext context;

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    public ScanProductModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @ReactMethod
    public void openScanPage() {
        ScanProductController.getInstance().setResultCallback(new ScanProductController.ScanResultCallback() {
            @Override
            public void callback(String text) {
                WritableMap map = Arguments.createMap();
                map.putString(context.getResources().getString(R.string.scan_content), text);
                RNBroadcast.sendEvent(context, context.getResources().getString(R.string.scan_result), map);
            }
        });
        context.startActivity(new Intent(context.getCurrentActivity(), CaptureActivity.class));
    }
}
