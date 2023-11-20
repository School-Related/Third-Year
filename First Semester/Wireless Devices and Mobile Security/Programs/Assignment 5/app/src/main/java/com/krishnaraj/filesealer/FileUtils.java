package com.krishnaraj.filesealer;

import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;
import android.provider.OpenableColumns;
import android.util.Log;

import androidx.fragment.app.FragmentActivity;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;


public class FileUtils {
    public static String readFileContentsFromInputStream(InputStream inputStream) {
        String result = null;
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            StringBuilder stringBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
            result = stringBuilder.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static String getFileNameFromUri(Context context, Uri uri) {
        String fileName = null;
        Cursor cursor = null;
        try {
            cursor = context.getContentResolver().query(uri, null, null, null, null);
            if (cursor != null && cursor.moveToFirst()) {
                int displayNameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                if (displayNameIndex != -1) {
                    fileName = cursor.getString(displayNameIndex);
                }
            }
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
        return fileName;
    }

    public static String readFileContents(Uri uri, FragmentActivity activity) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            try (InputStream inputStream = activity.getContentResolver().openInputStream(uri)) {
                if (inputStream != null) {
                    result = readFileContentsFromInputStream(inputStream);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    public static void writeToFileInDownloads(String fileName, String content) {
        File downloadsFolder = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
        File file = new File(downloadsFolder, fileName);

        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(content.getBytes());
            Log.d("EncryptFragment", "File written to: " + file.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception according to your needs
        }
    }
}
