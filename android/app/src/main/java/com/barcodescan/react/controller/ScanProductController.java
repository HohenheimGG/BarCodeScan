package com.barcodescan.react.controller;

public class ScanProductController {

    private static volatile ScanProductController mController;

    private ScanResultCallback callback;

    private ScanProductController() {

    }

    public static ScanProductController getInstance() {
        if(mController == null)
            synchronized (ScanProductController.class) {
                if(mController == null)
                    mController = new ScanProductController();
            }
        return mController;
    }

    public static void clearInstance() {
        mController = null;
    }

    public void handleResult(String text) {
        if(callback != null)
            callback.callback(text);
    }

    public void setResultCallback(ScanResultCallback callback) {
        this.callback = callback;
    }

    public interface ScanResultCallback {
        void callback(String text);
    }
}
