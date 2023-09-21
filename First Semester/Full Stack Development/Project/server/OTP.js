function create_otp() {
  // create a 6 digit otp on random.
  // this otp will be sent to the user's email
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

module.exports = create_otp;
