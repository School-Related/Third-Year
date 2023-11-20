package com.krishnaraj.filesealer.ui.decrypt;

import static com.krishnaraj.filesealer.FileUtils.getFileNameFromUri;
import static com.krishnaraj.filesealer.FileUtils.readFileContents;
import static com.krishnaraj.filesealer.FileUtils.writeToFileInDownloads;

import android.annotation.SuppressLint;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
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
import com.krishnaraj.filesealer.databinding.FragmentDecryptBinding;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.util.Arrays;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.ShortBufferException;
import javax.crypto.spec.SecretKeySpec;


public class DecryptFragment extends Fragment {

    private FragmentDecryptBinding binding;
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
        DecryptViewModel homeViewModel = new ViewModelProvider(this).get(DecryptViewModel.class);

        binding = FragmentDecryptBinding.inflate(inflater, container, false);
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

        Button decryptButton = root.findViewById(R.id.decrypt_btn);
        decryptButton.setOnClickListener(new View.OnClickListener() {
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

                String encryptedString = decryptWithAES(secretKey, fileContents, requireActivity().getApplicationContext());
                // log the encrypted string
                Log.d("DecryptFragment", "Encrypted String: " + encryptedString);

                // now write a new file called filename_encrypted.txt that contains the encrypted string
                String fileNameWithoutExtention = fileName.substring(0, fileName.lastIndexOf('.'));
                String encryptedFileName = fileNameWithoutExtention + "_decrypted.txt";

                try {
                    // write the encrypted string to the file
                    writeToFileInDownloads(encryptedFileName, encryptedString);
                    // Show a toast the the file has been written in downloads.
                    showToast(requireActivity().getApplicationContext(), "File written to Downloads folder as " + encryptedFileName + "." + "txt");
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.d("DecryptFragment", "Exception: " + e.getMessage());
                    // Show a toast that the file could not be written.
                    showToast(requireActivity().getApplicationContext(), "Error: Unable to write file.");
                }
            }
        });

        return root;
    }

    @SuppressLint("SetTextI18n")
    private void handleSelectedFile(Uri uri) {
        Log.d("DecryptFragment", "Selected file: " + uri.toString());
        fileName = getFileNameFromUri(requireActivity().getApplicationContext(), uri);
        selectedFileTextView.setText("Selected File: " + fileName);
        // read contents of the file
        fileContents = readFileContents(uri, requireActivity());
        // print the contents of the file
        System.out.println(fileContents);
        Log.d("DecryptFragment", "File contents: " + fileContents);
    }


    private String decryptWithAES(String key, String strToDecrypt, Context context) {
        Security.addProvider(new BouncyCastleProvider());
        byte[] keyBytes;

        String encryptionKey = key;

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

        Log.d("DecryptFragment", "Encryption Key: " + encryptionKey);

        try {
            keyBytes = encryptionKey.getBytes(StandardCharsets.UTF_8);
            SecretKeySpec skey = new SecretKeySpec(keyBytes, "AES");
            byte[] input = android.util.Base64.decode(strToDecrypt.trim(), android.util.Base64.DEFAULT);

            synchronized (Cipher.class) {
                @SuppressLint("GetInstance") Cipher cipher = Cipher.getInstance("AES/ECB/PKCS7Padding", "BC");
                cipher.init(Cipher.DECRYPT_MODE, skey);

                byte[] plainText = new byte[cipher.getOutputSize(input.length)];
                int ptLength = cipher.update(input, 0, input.length, plainText, 0);
                Log.d("DecryptFragment", "ptLength: " + ptLength);
                Log.d("DecryptFragment", "plainText: " + Arrays.toString(plainText));
                ptLength += cipher.doFinal(plainText, ptLength);
                Log.d("DecryptFragment", "ptLength: " + ptLength);
                // make the plaintext based on the pt length
                String decryptedString = new String(plainText, 0, ptLength);
                // log the decrypted string
                Log.d("DecryptFragment", "Decrypted String: " + decryptedString);
                return decryptedString;
            }
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | NoSuchProviderException |
                 InvalidKeyException | BadPaddingException | IllegalBlockSizeException e) {
            e.printStackTrace();
            Log.d("DecryptFragment", "Exception: " + e.getMessage());
            showToast(context, "Error: Unable to Decode this Text");
        } catch (ShortBufferException e) {
            throw new RuntimeException(e);
        }

        return "";
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
