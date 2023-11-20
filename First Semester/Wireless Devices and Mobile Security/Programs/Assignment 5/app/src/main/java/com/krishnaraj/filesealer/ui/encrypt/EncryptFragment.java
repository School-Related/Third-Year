package com.krishnaraj.filesealer.ui.encrypt;

import static com.krishnaraj.filesealer.FileUtils.getFileNameFromUri;
import static com.krishnaraj.filesealer.FileUtils.readFileContents;
import static com.krishnaraj.filesealer.FileUtils.writeToFileInDownloads;

import android.annotation.SuppressLint;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.krishnaraj.filesealer.R;
import com.krishnaraj.filesealer.databinding.FragmentEncryptBinding;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Security;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.ShortBufferException;
import javax.crypto.spec.SecretKeySpec;


public class EncryptFragment extends Fragment {

    private FragmentEncryptBinding binding;
    private TextView selectedFileTextView;
    private EditText keyText;
    private String fileContents, fileName;

    private final ActivityResultLauncher<String[]> openDocumentLauncher = registerForActivityResult(new ActivityResultContracts.OpenDocument(), new ActivityResultCallback<Uri>() {
        @Override
        public void onActivityResult(Uri result) {
            if (result != null) {
                handleSelectedFile(result);
            }
        }
    });

    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        EncryptViewModel homeViewModel = new ViewModelProvider(this).get(EncryptViewModel.class);

        binding = FragmentEncryptBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        // Initialize UI elements
        selectedFileTextView = root.findViewById(R.id.selected_file_txt);
        keyText = root.findViewById(R.id.enter_key_txt_box);

        Button selectFileButton = root.findViewById(R.id.open_file_btn);
        selectFileButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openDocumentLauncher.launch(new String[]{"text/plain"});
            }
        });

        Button encryptButton = root.findViewById(R.id.encrypt_btn);
        encryptButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                // first make sure nothing is null
                if (fileName == null) {
                    showToast(requireActivity().getApplicationContext(), "Please select a file.");
                    return;
                }

                // get the key from the text box
                String secretKey = keyText.getText().toString();

                // check if key is null
                if (secretKey.isEmpty()) {
                    showToast(requireActivity().getApplicationContext(), "Please enter a key.");
                    return;
                }

                // check if file is empty or not
                if (fileContents.isEmpty()) {
                    showToast(requireActivity().getApplicationContext(), "File is empty.");
                    return;
                }

                String encryptedString = encryptBouncyCastle(fileContents, secretKey, requireActivity().getApplicationContext());
                // log the encrypted string
                Log.d("EncryptFragment", "Encrypted String: " + encryptedString);

                // now write a new file called filename_encrypted.txt that contains the encrypted string
                String fileNameWithoutExtention = fileName.substring(0, fileName.lastIndexOf('.'));
                String encryptedFileName = fileNameWithoutExtention + "_encrypted.txt";

                try {
                    // write the encrypted string to the file
                    writeToFileInDownloads(encryptedFileName, encryptedString);
                    // Show a toast the the file has been written in downloads.
                    showToast(requireActivity().getApplicationContext(), "File written to Downloads folder as " + encryptedFileName + "." + "txt");
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.d("EncryptFragment", "Exception: " + e.getMessage());
                    // Show a toast that the file could not be written.
                    showToast(requireActivity().getApplicationContext(), "Error: Unable to write file.");
                }
            }
        });

        return root;
    }

    @SuppressLint("SetTextI18n")
    private void handleSelectedFile(Uri uri) {
        Log.d("EncryptFragment", "Selected file: " + uri.toString());
        fileName = getFileNameFromUri(requireActivity().getApplicationContext(), uri);
        selectedFileTextView.setText("Selected File: " + fileName);
        // read contents of the file
        fileContents = readFileContents(uri, requireActivity());
        // print the contents of the file
        System.out.println(fileContents);
        Log.d("EncryptFragment", "File contents: " + fileContents);

    }

    private String encryptBouncyCastle(String strToEncrypt, String secretKey, Context context) {
        // make sure nothing is empty
        if (strToEncrypt.isEmpty()) {
            showToast(context, "Please enter a string to encrypt.");
            return strToEncrypt;
        }

        String encryptionKey = secretKey;

        if (encryptionKey.isEmpty()) {
            showToast(context, "Please enter a key.");
            return encryptionKey;
        }

        if (encryptionKey.length() < 32) {
            int keyLength = encryptionKey.length();
            int repeatKey = 32 / keyLength;
            encryptionKey = new String(new char[repeatKey]).replace("\0", encryptionKey);
            int newKeyLength = encryptionKey.length();
            int addKey = 32 - newKeyLength;
            encryptionKey += encryptionKey.substring(0, addKey);
        }

        Log.d("EncryptFragment", "Encryption Key: " + encryptionKey);
        Log.d("EncryptFragment", "String to Encrypt: " + strToEncrypt);

        Security.addProvider(new BouncyCastleProvider());
        byte[] keyBytes;

        try {
            keyBytes = encryptionKey.getBytes(StandardCharsets.UTF_8);
            SecretKeySpec skey = new SecretKeySpec(keyBytes, "AES");
            byte[] input = strToEncrypt.getBytes(StandardCharsets.UTF_8);

            synchronized (Cipher.class) {
                @SuppressLint("GetInstance") Cipher cipher = Cipher.getInstance("AES/ECB/PKCS7Padding", "BC");
                cipher.init(Cipher.ENCRYPT_MODE, skey);

                byte[] cipherText = new byte[cipher.getOutputSize(input.length)];
                int ctLength = cipher.update(input, 0, input.length, cipherText, 0);
                ctLength += cipher.doFinal(cipherText, ctLength);
                Log.d("EncryptFragment", "ctLength: " + ctLength);
                // log the encrypted string
                return Base64.encodeToString(cipherText, Base64.DEFAULT);
            }
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | NoSuchProviderException |
                 InvalidKeyException | BadPaddingException | IllegalBlockSizeException e) {
            e.printStackTrace();
            Log.d("EncryptFragment", "Exception: " + e.getMessage());
            showToast(context, "Error: Unable to Encode this Text");
        } catch (ShortBufferException e) {
            throw new RuntimeException(e);
        }
        return encryptionKey;
    }

    private void showToast(Context context, String message) {
        Toast.makeText(context, message, Toast.LENGTH_LONG).show();
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}
