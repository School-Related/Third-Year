package com.krishnaraj.filesealer.ui.text;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class TextViewModel extends ViewModel {

    private final MutableLiveData<String> mText;

    public TextViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is notifications fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}