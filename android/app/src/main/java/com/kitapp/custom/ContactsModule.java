package com.kitapp.custom;

import android.content.ContentResolver;
import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;

/**
 * Created by cholland on 10/7/16.
 */

public class ContactsModule extends ReactContextBaseJavaModule {

    public ContactsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ContactsAndroid";
    }

    @ReactMethod
    public void getMatching(String searchString, Callback callback) {
        Context context = getReactApplicationContext();
        ContentResolver cr = context.getContentResolver();

        ContactsProvider contactsProvider = new ContactsProvider(cr, context);
        WritableArray contacts = contactsProvider.getMatchingContacts(searchString);

        callback.invoke(null, contacts);
    }
}
