package com.oodles.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.SharedPreferences;
import android.database.Cursor;
import android.preference.PreferenceManager;
import android.provider.ContactsContract;

import sqlite.NumberSqliteDataSource;

public class AlertBack extends CordovaPlugin {

	NumberSqliteDataSource ds;
	String number = "";
	JSONObject jObjectRequest = new JSONObject();

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		if (action.equals("alertBack")) {
			//sharedPreference(args.toString());
			ds = new NumberSqliteDataSource(cordova.getActivity()
					.getApplicationContext());
			number = ds.getNumber();
			if (number != "") {
				try {
					jObjectRequest.put("requestNo", number);
				} catch (JSONException e) {
					e.printStackTrace();
				}
			} else {
				try {
					jObjectRequest.put("requestNo", "");
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
			getContacts();
			callbackContext.success(jObjectRequest);
			ds.deleteNumber(number);
			return true;
		}
		return false; // Returning false results in a "MethodNotFound" error.
	}

	public void sharedPreference(String tlf) {
		String PhoneNo = tlf.substring(2, 12);
		SharedPreferences preferences = PreferenceManager
				.getDefaultSharedPreferences(cordova.getActivity()
						.getApplicationContext());
			SharedPreferences.Editor editor = preferences.edit();
			editor.putString("myPhoneNumber", PhoneNo);
			editor.commit();
	}

	public void getContacts() {
		JSONObject jObjectData;
		JSONArray jsonNuberList = new JSONArray();
		Cursor cur = cordova
				.getActivity()
				.getApplicationContext()
				.getContentResolver()
				.query(ContactsContract.Contacts.CONTENT_URI, null, null, null,
						null);
		if (cur.getCount() > 0) {
			while (cur.moveToNext()) {
				jObjectData = new JSONObject();
				String id = cur.getString(cur
						.getColumnIndex(ContactsContract.Contacts._ID));
				String name = cur
						.getString(cur
								.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
				if (Integer
						.parseInt(cur.getString(cur
								.getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER))) > 0) {
					Cursor pCur = cordova
							.getActivity()
							.getApplicationContext()
							.getContentResolver()
							.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
									null,
									ContactsContract.CommonDataKinds.Phone.CONTACT_ID
											+ " = ?", new String[] { id }, null);

					if (pCur.moveToNext()) {
						String phone = pCur
								.getString(pCur
										.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
						try {
							jObjectData.put("userName", name);
							jObjectData.put("phoneNumber", phone);
							jsonNuberList.put(jObjectData);
						} catch (JSONException e) {
							e.printStackTrace();
						}
					}
					pCur.close();
				}
			}
		}
		cur.close();
		try {
			jObjectRequest.put("data", jsonNuberList.toString());
		} catch (JSONException e) {
			e.printStackTrace();
		}

	}

}
