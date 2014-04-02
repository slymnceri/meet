package sqlite;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;

public class NumberSqliteDataSource {
	private SQLiteDatabase database;
	private PhoneNumberSqliteHelper dbHelper;

	public NumberSqliteDataSource(Context context) {
		dbHelper = new PhoneNumberSqliteHelper(context);
	}

	public void open() throws SQLException {
		database = dbHelper.getWritableDatabase();
	}

	public void close() {
		dbHelper.close();
	}

	public boolean addNumber(String number) {
		open();
		ContentValues values = new ContentValues();
		values.put("number", number);
		long id = database.insert("numbers", null, values);
		close();
		return id>0;
	}

	public String getNumber() {
		String result="";
		open();
		try{
		Cursor cursor = database.rawQuery("select * from numbers", null);
		cursor.moveToFirst();
		result =cursor.getString(1);
		cursor.close();
		close();
		}
		catch(Exception e){}
		return result;
	}

	public boolean deleteNumber(String number) {
		open();
		int i = database.delete("numbers", "number=" + number, null);
		close();
		return i > 0;
	}

}
