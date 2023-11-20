package com.krishnaraj.filesealer.ui.text;

import android.annotation.SuppressLint;
import android.content.Context;
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

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.krishnaraj.filesealer.R;
import com.krishnaraj.filesealer.databinding.FragmentTextBinding;

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


public class TextFragment extends Fragment {

    static {
        Security.addProvider(new BouncyCastleProvider());
    }

    private FragmentTextBinding binding;

    private TextView inputText;
    private EditText keyText;
    private EditText outputText;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        TextViewModel textViewModel =
                new ViewModelProvider(this).get(TextViewModel.class);

        binding = FragmentTextBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        // Initialize UI elements
        inputText = root.findViewById(R.id.encryption_text_box);
        keyText = root.findViewById(R.id.enter_key_here);
        outputText = root.findViewById(R.id.output_text_box);

        Button encryptButton = root.findViewById(R.id.encbtn);
        encryptButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                encryptBouncyCastle(
                        inputText.getText().toString(),
                        keyText.getText().toString(),
                        getContext()
                );
            }
        });

        Button decryptButton = root.findViewById(R.id.decbtn);
        decryptButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                decryptWithAES(
                        keyText.getText().toString(),
                        inputText.getText().toString(),
                        getContext()
                );
            }
        });

        return root;
    }


    private void encryptBouncyCastle(String strToEncrypt, String secretKey, Context context) {
        String encryptionKey = secretKey;

        if (encryptionKey.isEmpty()) {
            showToast(context, "Please enter a key.");
            return;
        }

        if (encryptionKey.length() < 32) {
            int keyLength = encryptionKey.length();
            int repeatKey = 32 / keyLength;
            encryptionKey = new String(new char[repeatKey]).replace("\0", encryptionKey);
            int newKeyLength = encryptionKey.length();
            int addKey = 32 - newKeyLength;
            encryptionKey += encryptionKey.substring(0, addKey);
        }

        Log.d("TextFragment", "Encryption Key: " + encryptionKey);
        Log.d("TextFragment", "String to Encrypt: " + strToEncrypt);

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
                Log.d("TextFragment", "ctLength: " + ctLength);
                String encryptedString = Base64.encodeToString(cipherText, Base64.DEFAULT);
                outputText.setText(encryptedString);
                // log the encrypted string
                Log.d("TextFragment", "Encrypted String: " + encryptedString);
            }
        } catch (NoSuchAlgorithmException | NoSuchPaddingException |
                 NoSuchProviderException | InvalidKeyException | BadPaddingException |
                 IllegalBlockSizeException e) {
            e.printStackTrace();
            Log.d("TextFragment", "Exception: " + e.getMessage());
            showToast(context, "Error: Unable to Encode this Text");
        } catch (ShortBufferException e) {
            throw new RuntimeException(e);
        }
    }

    private void decryptWithAES(String key, String strToDecrypt, Context context) {
        Security.addProvider(new BouncyCastleProvider());
        byte[] keyBytes;

        String encryptionKey = key;

        if (encryptionKey.isEmpty()) {
            showToast(context, "Please enter a key.");
            return;
        }

        if (encryptionKey.length() < 32) {
            int keyLength = encryptionKey.length();
            int repeatKey = 32 / keyLength;
            encryptionKey = new String(new char[repeatKey]).replace("\0", encryptionKey);
            int newKeyLength = encryptionKey.length();
            int addKey = 32 - newKeyLength;
            encryptionKey += encryptionKey.substring(0, addKey);
        }

        Log.d("TextFragment", "Encryption Key: " + encryptionKey);

        try {
            keyBytes = encryptionKey.getBytes(StandardCharsets.UTF_8);
            SecretKeySpec skey = new SecretKeySpec(keyBytes, "AES");
            byte[] input = Base64.decode(strToDecrypt.trim(), Base64.DEFAULT);

            synchronized (Cipher.class) {
                @SuppressLint("GetInstance") Cipher cipher = Cipher.getInstance("AES/ECB/PKCS7Padding", "BC");
                cipher.init(Cipher.DECRYPT_MODE, skey);

                byte[] plainText = new byte[cipher.getOutputSize(input.length)];
                int ptLength = cipher.update(input, 0, input.length, plainText, 0);
                Log.d("TextFragment", "ptLength: " + ptLength);
                Log.d("TextFragment", "plainText: " + Arrays.toString(plainText));
                ptLength += cipher.doFinal(plainText, ptLength);
                Log.d("TextFragment", "ptLength: " + ptLength);
                // make the plaintext based on the pt length
                String decryptedString = new String(plainText, 0, ptLength);
                outputText.setText(decryptedString);
                // log the decrypted string
                Log.d("TextFragment", "Decrypted String: " + decryptedString);

            }
        } catch (NoSuchAlgorithmException | NoSuchPaddingException |
                 NoSuchProviderException | InvalidKeyException | BadPaddingException |
                 IllegalBlockSizeException e) {
            e.printStackTrace();
            Log.d("TextFragment", "Exception: " + e.getMessage());
            showToast(context, "Error: Unable to Decode this Text");
        } catch (ShortBufferException e) {
            throw new RuntimeException(e);
        }

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
