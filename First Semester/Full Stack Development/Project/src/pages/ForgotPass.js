import React from "react";
import { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import "../css/Navbar.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPass = (props) => {
  let navigate = useNavigate();
  let base_url = React.useContext(BaseUrlContext).baseUrl;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [otpError, setOtpError] = React.useState("");
  const [serverOTP, setServerOTP] = React.useState("");

  function redirect() {
    props.setisNavbarPresent(true);
    navigate("/");
  }
  async function handleClick(e) {
    const comment = document.getElementById("comment");
    const mainbutton = document.getElementById("mainbutton");
    if (mainbutton.innerHTML === "Send OTP") {
      // if things arent correct comment and return
      if (!validateEmail(email)) {
        comment.innerHTML = "Please enter a valid email address.";
        return;
      }
      if (!validatePassword(password)) {
        comment.innerHTML = "Enter valid Password";
        return;
      }
      if (password !== confirmPassword) {
        comment.innerHTML = "Passwords dont match";
        return;
      }
      // check if the user exists in the database
      const response = await axios
        .post(
          `${base_url}/auth`,
          {},
          {
            params: {
              email: email,
              password: password,
            },
          },
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error(error);
          alert("server not running! a simulated response is being sent");
          const response = {
            data: {
              message: "simulation",
            },
          };
          return response;
        });
      if (response.data.message === "simulation") {
        comment.innerHTML = "Login Successful! Redirecting to Home Page!";
        setTimeout(() => {
          redirect();
        }, 1000);
      }
      // check if the user exists in the database
      else if (response.data.message === "user found pass correct") {
        // doom message
        comment.innerHTML =
          "The New Password cannot be the same as the old password!";
      } else if (response.data.message === "user found pass incorrect") {
        // success
        // send email
        let response = await axios
          .post(
            `${base_url}/send_reset_email`,
            {},
            {
              params: {
                email: email,
              },
            },
          )
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.error(error);
            alert("server not running! a simulated response is being sent");
            const response = {
              data: {
                message: "simulation",
              },
            };
            return response;
          });
        if (response.data.message === "simulation") {
          comment.innerHTML =
            "Password Change Successful! redirecting to Login Page!";
          setTimeout(() => {
            redirect();
          }, 1000);
        }

        if (response.data.message === "email sent") {
          comment.innerHTML = "OTP Sent! Check your Email!";
          setServerOTP(response.data.OTP);
          comment.innerHTML = "OTP Sent! Check your Email!";
          mainbutton.innerHTML = "Reset Password";
        } else if (response.data.message === "email not sent") {
          comment.innerHTML = "Couldnt Send OTP! Try Again!";
          alert("Something went wrong! Call the Devs! couldnt send otp");
        } else {
          comment.innerHTML = "Server not running!";
          alert(
            "Something went wrong! Server not running! Call the Devs! couldnt send otp",
          );
        }
      } else if (response.data.message === "user not found") {
        comment.innerHTML = "User Doesnt Exist! Try Again or Sign Up!";
      } else {
        comment.innerHTML = "Something went wrong! Call the Devs!";
        alert("Something went wrong! Call the Devs!");
      }
      // mainbutton.innerHTML = "Reset Password";
    } else if (mainbutton.innerHTML === "Reset Password") {
      // here we check the otp and reset the password
      if (otp !== serverOTP) {
        comment.innerHTML = "OTP Incorrect! Try Again!";
        return;
      }
      // reset password
      let response = await axios
        .post(
          `${base_url}/reset_password`,
          {},
          {
            params: {
              email: email,
              password: password,
            },
          },
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error(error);
          alert("server not running! a simulated response is being sent");
          const response = {
            data: {
              message: "simulation",
            },
          };
          return response;
        });

      if (response.data.message === "simulation") {
        // comment.innerHTML = "Login Successful! Redirecting to Home Page!";
        setTimeout(() => {
          redirect();
        }, 1000);
      }

      if (response.data.message === "success") {
        comment.innerHTML = "Password Changed! Redirecting to Login!";
        setTimeout(() => {
          redirect();
        }, 1000);
      } else if (response.data.message === "failure") {
        comment.innerHTML =
          "Couldnt change password, There has been some error. Try Again! ";
      } else {
        comment.innerHTML = "Something went wrong! Call the Devs!";
        alert("Something went wrong! Call the Devs! couldnt send otp");
      }
    }
  }
  const { setTheme } = React.useContext(ThemeContext);
  useEffect(() => {
    setTheme("light");
    const light_button = document.getElementById("light_button");
    light_button.click();
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/;
    return re.test(password);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);

    if (value.length !== 6) {
      setOtpError("OTP must be 6 digits long.");
    } else {
      setOtpError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form
  };

  return (
    <div className="p-0 m-0 bg-base-100">
      <div className="overflow-hidden">
        <div className="lg:flex rubik overflow-hidden">
          <div className="lg:w-1/2 xl:max-w-screen-sm">
            <div className="py-12 bg-base-100 lg:bg-transparent flex justify-center lg:justify-start lg:px-12">
              <div className="cursor-pointer flex items-center">
                <div id="brutuslogo" className="w-12 h-12 m-4"></div>
                <div className="text-2xl text-primary-content tracking-wide ml-2 font-semibold">
                  Anti Brutus
                </div>
              </div>
            </div>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
              <h2
                className="text-center text-4xl text-primary-content font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
              >
                Reset Password
              </h2>
              <div
                className="text-center text-xl text-secondary font-display font-semibold lg:text-left xl:text-xl
              xl:text-bold rubik pt-3"
              >
                “The fault, dear Brutus, is not in our stars But in ourselves.”{" "}
                <br></br>
                <br></br>
                <span className="text-accent">
                  {" "}
                  Ceasar to Brutus, Act 1, Scene III
                </span>
              </div>
              <div className="mt-12">
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="text-2xl font-bold text-primary-content tracking-wide">
                      Email Address
                    </div>
                    <input
                      className="w-full text-xl py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent"
                      type="email"
                      placeholder="baldev@gmail.com"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {emailError && <p className="text-red-500">{emailError}</p>}
                  </div>
                  <div className="mt-8">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-primary-content bg-transparent tracking-wide">
                        New Master Password
                      </div>
                    </div>
                    <input
                      className="w-full text-lg py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    {passwordError && (
                      <p className="text-red-500">{passwordError}</p>
                    )}
                  </div>
                  <div className="mt-8">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-primary-content bg-transparent tracking-wide">
                        Confirm Master Password
                      </div>
                    </div>
                    <input
                      className="w-full text-lg py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent"
                      type="password"
                      placeholder="Enter your password again. Dont copy paste. "
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    {confirmPasswordError && (
                      <p className="text-red-500">{confirmPasswordError}</p>
                    )}
                  </div>
                  <div className="mt-8">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-primary-content bg-transparent tracking-wide">
                        OTP
                      </div>
                    </div>
                    <input
                      className="w-full text-lg py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent"
                      type="number"
                      placeholder="Enter the OTP Received on your phone"
                      value={otp}
                      onChange={handleOtpChange}
                    />
                    {otpError && <p className="text-red-500">{otpError}</p>}
                  </div>
                  <div
                    id="comment"
                    className="text-2xl text-center m-4 text-accent"
                  >
                    Enter Credentials to Sign Up!
                  </div>
                  <div className="mt-10">
                    <button
                      className="bg-primary p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primary-focus text-primary-content
                          shadow-lg text-xl cursor-pointer"
                      onClick={() => {
                        // navigate to home using router
                        handleClick();
                      }}
                      id="mainbutton"
                    >
                      Send OTP
                    </button>
                  </div>
                </form>
                <div className="mt-12 text-xl font-display font-semibold text-primary-content text-center">
                  Suddenly Remembered it ?{" "}
                  <NavLink
                    className="cursor-pointer text-accent hover:text-accent-focus"
                    to="/"
                  >
                    Log In Quick!
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center bg-indigo-200 flex-1 h-screen">
            <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
              <div id="fpasssvg" className="w-[50rem] h-[40rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
