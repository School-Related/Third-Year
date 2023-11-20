package com.krishnaraj.filesealer.ui.encrypt;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class EncryptViewModel extends ViewModel {

    private final MutableLiveData<String> mText;

    public EncryptViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is home fragment 2");
    }

    public LiveData<String> getText() {
        return mText;
    }
}