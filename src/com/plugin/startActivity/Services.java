package com.plugin.startActivity;

import org.json.JSONException;
import org.json.JSONObject;
import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.PropertyInfo;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapPrimitive;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;

import android.*;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.IBinder;
import android.preference.PreferenceManager;
import android.util.Log;

public class Services extends Service {

	NotificationManager mManager;
	Notification notification;
	PendingIntent pendingNotificationIntent;
	Intent intent1;
	String myPhoneNumber = "";
	String phoneNumber = "";
	String username = "";
	String currentid = "";

	final String NAMESPACE = "http://tempuri.org/";
	String METHOD_NAME = "ControlRequest";
	String SOAP_ACTION = NAMESPACE + METHOD_NAME;
	final String URL = "http://suleymanceri-001-site1.myasp.net/Service1.asmx";

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		
		Log.v("service", "service started");

		Thread th = new Thread(new Runnable() {
			@Override
			public void run() {
				while (true) {
					try {
						sharedPreference();
						String result = CheckRequest();
						if (result != null) {
							JSONObject jObj;
							try {
								jObj = new JSONObject(result);
								username = jObj.getString("userName");
								phoneNumber = jObj.getString("phoneNumber");
								if (!phoneNumber.equalsIgnoreCase("")) {
									showNotification(phoneNumber, username);
									currentid = jObj.getString("id");
								}
							} catch (JSONException e) {
								e.printStackTrace();
							}
						}
						Thread.sleep(5000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}

				}
			}
		});
		th.start();
		return START_STICKY;
	}

	public String CheckRequest() {
		String res = "";
		try {

			SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
			PropertyInfo userId = new PropertyInfo();
			userId.setName("id");
			userId.setValue(myPhoneNumber);
			userId.setType(String.class);
			request.addProperty(userId);
			SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
					SoapEnvelope.VER11);
			envelope.dotNet = true;
			envelope.setOutputSoapObject(request);
			HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
			androidHttpTransport.call(SOAP_ACTION, envelope);
			SoapPrimitive response = (SoapPrimitive) envelope.getResponse();
			res = response.toString();

		} catch (Exception e) {

			res = e.getMessage();
		}
		return res;
	}

	public void sharedPreference() {
		SharedPreferences preferences = PreferenceManager
				.getDefaultSharedPreferences(getApplicationContext());
		SharedPreferences.Editor editor = preferences.edit();
		myPhoneNumber = preferences.getString("myPhoneNumber", "N/A");
		editor.commit();
	}

	@SuppressWarnings("deprecation")
	private void showNotification(String phonenumber, String username) {
		mManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
		intent1 = new Intent(getBaseContext(), MainActivity.class);
		intent1.putExtra("PhoneNumber", phoneNumber);
		notification = new Notification(R.drawable.ic_menu_directions,
				"Bir buluþma isteðiniz var", System.currentTimeMillis());
		pendingNotificationIntent = PendingIntent.getActivity(
				getApplicationContext(), 0, intent1,
				PendingIntent.FLAG_UPDATE_CURRENT);
		notification.defaults |= Notification.DEFAULT_SOUND;
		notification.flags |= Notification.FLAG_AUTO_CANCEL;
		notification.setLatestEventInfo(getApplicationContext(),
				"ToMEet Buluþma Ýsteði (" + username + ")",
				" Kabul ediyorsanýz Týklayýnýz", pendingNotificationIntent);
		mManager.notify(0, notification);
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
	}

	@Override
	public IBinder onBind(Intent arg0) {
		return null;
	}

}
