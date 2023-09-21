// Importing required modules
const express = require("express");
const dbobj = require("./db_manager");
const cors = require("cors");
const createHttpError = require("http-errors");
const app = express();
const send_mail = require("./send_mail");
const otp = require("./OTP");
const get_data = require("./firebase");
// Enable CORS
app.use(cors());

// Importing crypto module for generating salt and hashing password
const crypto = require("crypto");

// Function to generate a random salt
function generateSalt() {
  return crypto.randomBytes(5).toString("hex");
}

//Function to create DEK for encryption
function generateDEK(email, salt, string) {
  const key = email + salt;
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let dek = cipher.update(string, "utf8", "hex");
  dek += cipher.final("hex");
  return dek;
}

function decryptDEK(DEK, KEK) {
  const decipher = crypto.createDecipher("aes-256-cbc", KEK);
  let decryptedDEK = decipher.update(DEK, "hex", "utf8");
  decryptedDEK += decipher.final("utf8");
  return decryptedDEK;
}

function encryptUsingKEK(dek, kek) {
  const cipher = crypto.createCipher("aes-256-cbc", kek);
  let encryptedDEK = cipher.update(dek, "utf8", "hex");
  encryptedDEK += cipher.final("hex");
  return encryptedDEK;
}

function decrypSalt(encryptedSalt, kek) {
  const decipher = crypto.createDecipher("aes-256-cbc", kek);
  let salt = decipher.update(encryptedSalt, "hex", "utf8");
  salt += decipher.final("utf8");
  return salt;
}

// Function to hash password with salt
function hashPassword(password, salt) {
  const hash = crypto.createHash("sha256");
  hash.update(password + salt);
  return hash.digest("hex");
}

// Function to encrypt data using DEK
function encryptData(data, dek) {
  const cipher = crypto.createCipher("aes-256-cbc", dek);
  let encryptedData = cipher.update(data, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

// Funtion to decrypt data using DEK
function decryptData(data, dek) {
  const decipher = crypto.createDecipher("aes-256-cbc", dek);
  let decryptedData = decipher.update(data, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

// Route for home page
app.get("/", (req, res) => {
  res.send("Home");
});

// Route for about page
app.get("/about", (request, response) => {
  response.send("<h1>About</h1>");
});

// Route for testing database connection
app.get("/test", async (request, response) => {
  await dbobj.test((err, rows) => {
    if (err) {
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      response.send("hi");
    }
  });
});

// Route for user authentication
app.post("/auth", async (request, response) => {
  // Check if the user exists in the database
  const user_fate = await dbobj.checkUser(request.query.email);
  if (user_fate === false) {
    // Send a message to the client if user not found
    return response.send({ user_data: user_fate, message: "user not found" });
  } else if (user_fate) {
    // Decrypt the salt using the KEK
    const KEK = await get_data("KEK");
    const decryptedSalt = decrypSalt(user_fate.salt, KEK);
    // Send the salt and the final password hash to the client if user found
    const current_password = hashPassword(
      request.query.password,
      decryptedSalt,
    );
    if (current_password === user_fate.password) {
      return response.send({
        user_data: user_fate,
        message: "user found pass correct",
      });
    } else {
      return response.send({
        user_data: user_fate,
        message: "user found pass incorrect",
      });
    }
  } else {
    // Send an error message if something went wrong
    const error = new createHttpError.BadRequest(
      "something went wrong! Call the Devs!",
    );
    return error;
  }
});

// Route for adding a new user
app.post("/add_user", async (request, response) => {
  const user_email = request.query.email;
  try {
    // Check if user already exists
    const existingUser = await dbobj.checkUser(user_email);
    if (existingUser === false) {
      // Generate salt and hash password
      const salt = generateSalt();
      const DEK = generateDEK(
        request.query.email,
        salt,
        request.query.special_string,
      );
      const KEK = await get_data("KEK");
      const encrypted_DEK = encryptUsingKEK(DEK, KEK);
      const encrypted_salt = encryptUsingKEK(salt, KEK);
      const hash_password = hashPassword(request.query.password, salt);
      // Add the user to the database
      const userInsert = await dbobj.insertUser(
        request.query.email,
        hash_password,
        request.query.UserName,
        encrypted_salt,
        encrypted_DEK,
      );
      // Send a success message if user inserted successfully
      if (userInsert) {
        response.send({ message: "user inserted successfully" });
      }
      // Send an error message if user not inserted
      else {
        response.send({ message: "user not inserted" });
      }
    } else {
      // Send a message to the client if user already exists
      response.send({ exist: true, message: "user already exists" });
    }
  } catch (error) {
    // Send an error message if something went wrong
    response.send({ message: "something went wrong" });
  }
});

// Route for sending oTP email
app.post("/send_email", async (request, response) => {
  if (!request.query.email) {
    response.send({ message: "email not sent" });
    return;
  }
  // Check if the user exists in the database
  const user_fate = await dbobj.checkUser(request.query.email);
  if (user_fate === false) {
    // Send a message to the client if user not found and send password reset email
    const generated_Otp = otp();
    send_mail(request.query.email, "OTP Verification", generated_Otp);
    response.send({ message: "email sent", OTP: generated_Otp });
  } else if (user_fate) {
    // Send a message to the client if user found and email not sent
    response.send({ message: "email not sent" });
  }
});

app.post("/send_reset_email", async (request, response) => {
  if (!request.query.email) {
    response.send({ message: "email not sent" });
    return;
  }
  // Check if the user exists in the database
  const user_fate = await dbobj.checkUser(request.query.email);
  if (user_fate === false) {
    // Send a message to the client if user not found and send password reset email
    response.send({ message: "email not sent" });
  } else if (user_fate) {
    // Send a message to the client if user found
    const generated_Otp = otp();
    send_mail(request.query.email, "Password Reset", generated_Otp);
    response.send({ message: "email sent", OTP: generated_Otp });
  }
});

// Route for resetting user password
app.post("/reset_password", async (request, response) => {
  // Check if the user exists in the database
  const user_fate = await dbobj.checkUser(request.query.email);
  if (user_fate) {
    // Send a message to the client if user found
    const KEK = await get_data("KEK");
    const decryptedSalt = decrypSalt(user_fate.salt, KEK);
    const new_password = hashPassword(request.query.password, decryptedSalt);
    const reset_result = await dbobj.reset_password(
      request.query.email,
      new_password,
    );
    if (reset_result) {
      response.send({ message: "success" });
    } else {
      response.send({ message: "failure" });
    }
  } else {
    // Reset user password if OTP is valid
    response.send({ message: "user not found" });
  }
});

// Route for getting vaults
app.post("/get_vaults", async (request, response) => {
  const user_email = request.query.user_email;
  try {
    const vault_data = await dbobj.get_vaults(user_email);
    if (vault_data) {
      response.send({ message: "success", data: vault_data });
    } else {
      response.send({ message: "failure" });
    }
  } catch (error) {
    response.send({ message: "something went wrong" });
  }
});

// Route for vault data
app.post("/add_vault_data", async (request, response) => {
  const vaultid = request.query.vault_id;
  const Pass_name = request.query.pass_name;
  const username = request.query.user_name;
  const Password = request.query.password;
  const Url = request.query.url;
  const Description = request.query.description;
  const Icon = request.query.icon;
  const email = request.query.user_email;
  const user_fate = await dbobj.checkUser(email);
  const KEK = await get_data("KEK");
  const DEK = decryptDEK(user_fate.DEK, KEK);
  const encryptedPassword = encryptData(Password, DEK);
  const encryptedUrl = encryptData(Url, DEK);

  console.log("Pass_name:", Pass_name);
  console.log("username:", username);
  console.log("Password:", Password);
  console.log("Url:", Url);
  console.log("Description:", Description);
  console.log("Icon:", Icon);
  console.log("email:", email);

  
  if (user_fate) {
    try {
      const vault_data = await dbobj.add_vault_data(
        vaultid,
        user_fate.id,
        Pass_name,
        username,
        encryptedPassword,
        encryptedUrl,
        Description,
        Icon,
      );
      if (vault_data) {
        response.send({ message: "success" });
      } else {
        response.send({ message: "failure" });
      }
    } catch (error) {
      response.send({ message: "something went wrong" });
    }
  } else {
    response.send({ message: "user not found" });
  }
});

// Route for updating vault passwords
app.post("/update_vault_data", async (request, response) => {
  const vaultid = request.query.vault_id;
  const pass_name = request.query.pass_name;
  const username = request.query.user_name;
  const password = request.query.password;
  const url = request.query.url;
  const description = request.query.description;
  const icon = request.query.icon;
  const pass_id = request.query.pass_id;

  const user_fate = await dbobj.checkUser(request.query.user_email);
  const KEK = await get_data("KEK");
  const DEK = decryptDEK(user_fate.DEK, KEK);
  const encryptedPassword = encryptData(password, DEK);
  const encryptedUrl = encryptData(url, DEK);
  if (user_fate) {
    try {
      const vault_data = await dbobj.update_vault_data(
        vaultid,
        pass_id,
        pass_name,
        username,
        encryptedPassword,
        encryptedUrl,
        description,
        icon,
      );
      if (vault_data) {
        response.send({ message: "success" });
      } else {
        response.send({ message: "failure" });
      }
    } catch (error) {
      response.send({ message: "something went wrong" });
    }
  } else {
    response.send({ message: "user not found" });
  }
});

// Route for adding new vaults
app.post("/add_vault", async (request, response) => {
  const vault_name = request.query.vault_name;
  const vault_description = request.query.vault_description;
  const user_email = request.query.user_email;

  try {
    const vault_data = await dbobj.add_vault(
      vault_name,
      vault_description,
      user_email,
    );
    if (vault_data) {
      response.send({ message: "success" });
    } else {
      response.send({ message: "failure" });
    }
  } catch (error) {
    response.send({ message: "something went wrong" });
  }
});

// Route for deleting vaults data
app.post("/delete_vault_data", async (request, response) => {
  const pass_id = request.query.pass_id;
  if (!pass_id) {
    response.send({ message: "failure" });
    return;
  }
  try {
    const vault_data = await dbobj.delete_vault_data(pass_id);
    if (vault_data) {
      response.send({ message: "success" });
    } else {
      response.send({ message: "failure" });
    }
  } catch (error) {
    response.send({ message: "something went wrong" });
  }
});

app.post("/delete_vault", async (request, response) => {
  const vaultid = request.query.vault_id;

  try {
    const vault_data = await dbobj.delete_vault(vaultid);
    if (vault_data) {
      response.send({ message: "success" });
    } else {
      response.send({ message: "failure" });
    }
  } catch (error) {
    response.send({ message: "something went wrong" });
  }
});

// Route for get vault passwords
app.post("/get_vault_data", async (request, response) => {
  const vaultid = request.query.vault_id;
  try {
    const user_fate = await dbobj.checkUser(request.query.user_email);
    const vault_data = await dbobj.get_vault_data(vaultid);
    const KEK = await get_data("KEK");
    const DEK = decryptDEK(user_fate.DEK, KEK);
    if (vault_data) {
      if (vault_data.length === 0) {
        response.send({ message: "sucess", data: vault_data });
        return;
      } else {
        for (let i = 0; i < vault_data.length; i++) {
          vault_data[i].password = decryptData(vault_data[i].password, DEK);
          vault_data[i].website_url = decryptData(
            vault_data[i].website_url,
            DEK,
          );
        }
      }
      response.send({ message: "success", data: vault_data });
    } else {
      response.send({ message: "failure" });
    }
  } catch (error) {
    response.send({ message: "something went wrong" });
  }
});

// Route for get vault passwords
app.post("/get_profile_data", async (request, response) => {
  const user_email = request.query.user_email;
  const user_fate = await dbobj.checkUser(user_email);
  try {
    let count_passwords = await dbobj.get_no_of_passwords(user_fate.id);
    let count_vaults = await dbobj.get_no_of_vaults(user_email);
    if (!count_vaults) {
      count_vaults = 0;
    }
    if (!count_passwords) {
      count_passwords = 0;
    }
    const data_to_send = {
      count_passwords: count_passwords[0].count,
      count_vaults: count_vaults[0].count,
      user_name: user_fate.UserName,
    };
    // send data to client
    response.send({ message: "success", data: data_to_send });
  } catch (error) {
    response.send({ message: "failure" });
  }
});

// Exporting the app module
module.exports = app;
