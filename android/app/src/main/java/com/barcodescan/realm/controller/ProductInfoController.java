package com.barcodescan.realm.controller;

import com.barcodescan.realm.modal.ProductInfo;

import io.realm.Realm;

/**
 * Created by hohenheim on 17/10/20.
 */

public class ProductInfoController {

    private static ProductInfoController controller;
    private Realm realm;

    public static ProductInfoController getInstance() {
        if(controller == null)
            synchronized (ProductInfoController.class) {
                if(controller == null)
                    controller = new ProductInfoController();
            }
        return controller;
    }

    private ProductInfoController() {
        realm = Realm.getDefaultInstance();
    }

    public boolean insert(String code) {
        if(code == null)
            return false;
        String[] s = code.split("-");
        if(s.length < 3)
            return false;
        realm.beginTransaction();
        ProductInfo info = realm.createObject(ProductInfo.class);
        info.setName(s[0]);
        info.setDescription(s[1]);
        info.setPrice(s[2]);
        info.setCode(code);
        realm.commitTransaction();
        return true;
    }
}
