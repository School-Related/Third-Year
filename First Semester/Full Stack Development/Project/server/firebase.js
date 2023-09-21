const admin = require("firebase-admin");

var serviceAccount = require("./admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://anti-brutus-default-rtdb.asia-southeast1.firebasedatabase.app/",
  authDomain: "anti-brutus.firebaseapp.com",
});

var db = admin.database();

// function to get data

async function get_data(what_to_get) {
  var ref = db.ref(what_to_get);
  var data = await ref.once("value").then((snapshot) => {
    return snapshot.val();
  });
  return data;
}

module.exports = get_data;
