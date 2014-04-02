package com.plugin.startActivity;

import android.os.Bundle;
import org.apache.cordova.*;

import sqlite.NumberSqliteDataSource;

public class MainActivity extends CordovaActivity 
{
	String phoneNumber="";
	NumberSqliteDataSource ds;
	Bundle extras=null;
	
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        //startService(new Intent(getContext(), Services.class));
        extras = getIntent().getExtras();
		//if (extras.getString("PhoneNumber") != null) {
			phoneNumber ="123456"; //extras.getString("PhoneNumber");
			ds = new NumberSqliteDataSource(this);
			ds.addNumber(phoneNumber);
		//}
        super.init();
		super.loadUrl(Config.getStartUrl(),15000);
		
    }
    
    
   
}

