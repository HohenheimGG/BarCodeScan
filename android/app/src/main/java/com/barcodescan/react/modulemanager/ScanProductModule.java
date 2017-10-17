package com.barcodescan.react.modulemanager;

import android.content.Intent;

import com.barcodescan.zxing.CaptureActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by hohenheim on 17/10/17.
 */

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
        context.startActivity(new Intent(context.getCurrentActivity(), CaptureActivity.class));
    }
}
