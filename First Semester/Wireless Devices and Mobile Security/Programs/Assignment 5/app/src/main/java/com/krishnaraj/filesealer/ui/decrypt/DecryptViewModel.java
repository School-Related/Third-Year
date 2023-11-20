package com.krishnaraj.filesealer.ui.decrypt;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class DecryptViewModel extends ViewModel {

    private final MutableLiveData<String> mText;

    public DecryptViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is dashboard fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}