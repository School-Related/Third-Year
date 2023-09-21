import React, { useState } from "react";
import { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import "../css/Navbar.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  IconCircleCheckFilled,
  IconCircleFilled,
  IconEye,
  IconEyeClosed,
} from "@tabler/icons-react";

const Signup = (props) => {
  const { setTheme } = React.useContext(ThemeContext);
  useEffect(() => {
    setTheme("light");
    const light_button = document.getElementById("light_button");
    light_button.click();
  });

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasCapital, setHasCapital] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [serverOTP, setServerOTP] = useState(0);
  const [otp, setOtp] = useState(0);
  const base_url = React.useContext(BaseUrlContext).baseUrl;

  // password criteria states
  const [passLength, setPassLength] = useState(0);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_-\s]{3,25}$/;
    return re.test(username);
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
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

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (!validateUsername(value)) {
      setUsernameError(
        "Username must be between 3 and 16 characters long and can only contain letters, numbers, underscores, and hyphens.",
      );
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPassLength(value.length);

    // Check if password has at least one capital letter
    const capitalRe = /[A-Z]/;
    setHasCapital(capitalRe.test(value));

    // Check if password has at least one number
    const numberRe = /\d/;
    setHasNumber(numberRe.test(value));

    // Check if password has at least one symbol
    const symbolRe = /[@$!%*?&]/;
    setHasSymbol(symbolRe.test(value));

    // Check if password is valid
    if (!validatePassword(value)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
      );
    } else {
      setPasswordError("");
    }
  };

  const redirect = () => {
    props.setisNavbarPresent(true);
    navigate("/");
  };

  const handleSubmit = async () => {
    const comment = document.getElementById("comment");
    const mainbutton = document.getElementById("mainbutton");

    if (mainbutton.innerHTML === "Send OTP") {
      if (passwordError || emailError || usernameError || !passwordMatch) {
        comment.innerHTML = "Please fill the form correctly";
        comment.classList.add("text-red-500");
        setTimeout(() => {
          comment.innerHTML = "Enter Credentials to Sign Up!";
          comment.classList.remove("text-red-500");
        }, 3000);
        return;
      } else {
        // so everything at this point is filled correctly.
        // send a auth request making sure the user doesnt exist already.
        const response = await axios
          .post(
            `${base_url}/auth`,
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
          // comment.innerHTML = "Login Successful! Redirecting to Home Page!";
          setTimeout(() => {
            redirect();
          }, 1000);
        }

        // check if the user exists in the database
        else if (
          response.data.message === "user found pass correct" ||
          response.data.message === "user found pass incorrect"
        ) {
          comment.innerHTML = "User Exists! Redirecting to Login Page!";
          setTimeout(() => {
            redirect();
          }, 1000);
        } else if (
          response.data.user_data === false ||
          response.data.message === "user not found"
        ) {
          // so if the user doesnt exist
          // ask server to send otp
          let response = await axios
            .post(
              `${base_url}/send_email`,
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
            comment.innerHTML = "Signup Successful! Redirecting to Login Page!";
            setTimeout(() => {
              redirect();
            }, 1000);
          }

          if (response.data.message === "email sent") {
            setServerOTP(response.data.OTP);
            comment.innerHTML = "OTP Sent! Check your Email!";
            mainbutton.innerHTML = "Welcome to the Empire!";
          } else if (response.data.message === "email not sent") {
            comment.innerHTML = "Couldnt Send OTP! Try Again!";
            alert("Something went wrong! Call the Devs! couldnt send otp");
          }
        } else {
          comment.innerHTML = "Something went wrong! Call the Devs!";
          alert("Something went wrong! Call the Devs!");
        }
      }
    }
    if (mainbutton.innerHTML === "Welcome to the Empire!") {
      const comment = document.getElementById("comment");
      comment.innerHTML = "OTP Sent! Check your Email!";
      // here we will check the otp
      // if otp is correct, we will add the user to the database
      if (otp < 6) {
        comment.innerHTML = "OTP must be 6 digits long";
        return;
      }

      if (otp === serverOTP) {
        comment.innerHTML = "OTP Verified! Redirecting to Login Page!";
        // add user post request.
        const response = await axios
          .post(
            `${base_url}/add_user`,
            {},
            {
              params: {
                email: email,
                UserName: username,
                password: password,
                special_string: "dog",
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

        if (response.data.message === "user inserted successfully") {
          comment.innerHTML = "User Registered";
          setTimeout(() => {
            redirect();
          }, 1000);
        } else {
          comment.innerHTML = "User not inserted";
          alert("Something went wrong! Call the Devs! couldnt add user");
        }
      } else {
        comment.innerHTML = "OTP Incorrect! Try Again!";
      }
    }
  };

  const checkPasswordMatch = (e) => {
    const value = e.target.value;
    if (value !== password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleOtp = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div className="p-0 m-0 bg-base-100">
      <div className="">
        <div className="lg:flex rubik ">
          <div className="lg:w-2/3">
            <div className="px-16 py-12 rubik text-center text-4xl text-primary-content font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
              Sign Up!
              <div className="text-center text-xl text-secondary-focus font-display font-semibold lg:text-left xl:text-xl xl:text-bold rubik pt-3">
                <span className="italic">
                  “I love the name of honour more than I fear death.”
                </span>
                <br></br>
                <span className="text-secondary">
                  {" "}
                  Brutus to Ceasar, Act 1, Scene 2.
                </span>
                <br></br>
                <br></br>
                <span className="text-accent"> So do we.</span>
                <br></br>
              </div>
            </div>
            <div className="p-4">
              <form className="">
                <div className="flex">
                  <div className="p-12 w-full flex flex-col gap-6 pb-4 mb-0">
                    {/* name */}
                    <div>
                      <div className="text-2xl font-bold text-primary-content tracking-wide">
                        Name
                      </div>
                      <input
                        className="w-full text-xl py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent"
                        type="text"
                        placeholder="Julius Ceasar"
                        value={username}
                        onChange={handleUsernameChange}
                      />
                      {usernameError && (
                        <div className="text-red-500 text-sm mt-1">
                          {usernameError}
                        </div>
                      )}
                    </div>

                    {/* email */}
                    <div>
                      <div className="text-2xl font-bold text-primary-content tracking-wide mt-8">
                        Email Address
                      </div>
                      <input
                        className="w-full text-xl py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent"
                        type="email"
                        placeholder="Brutus@rome.com"
                        value={email}
                        onChange={handleEmailChange}
                      />{" "}
                      {emailError && (
                        <div className="text-red-500 text-sm mt-1">
                          {emailError}
                        </div>
                      )}
                    </div>
                    <div className="text-base-content rubik text-xl">
                      The OTP will be sent to this email.
                    </div>
                    {/* otp */}
                    <div>
                      <div className="text-2xl font-bold text-primary-content tracking-wide mt-6">
                        OTP
                      </div>
                      <input
                        className="w-full text-xl py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent"
                        type="number"
                        placeholder="Enter OTP Received on Email ID"
                        onChange={handleOtp}
                        value={otp}
                      />
                    </div>
                  </div>

                  <div className="p-12 pt-0 mt-0 w-full mb-0 pb-4">
                    {/* 
										name
										otp
										password instructions
										password
										confirm password
										eye of password
									*/}
                    <div className="text-accent rubik text-xl bg-base-200 rounded-xl p-8 mt-0">
                      This is the only Password you have to remember. Make sure
                      it is Secure, and you never forget it. Do not write it
                      down anywhere. Do not share it with anyone.
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-primary-content bg-transparent tracking-wide">
                          Master Password
                        </div>
                      </div>
                      <div className="flex flex-row gap-6 w-[34rem]">
                        <input
                          className="w-full text-lg py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent mb-4"
                          type={passVisible ? "text" : "password"}
                          placeholder="Enter your password. Never Forget it. "
                          value={password}
                          onChange={handlePasswordChange}
                        />

                        {passVisible ? (
                          <IconEye
                            className="w-10 h-10"
                            onClick={() => {
                              setPassVisible(() => {
                                return !passVisible;
                              });
                            }}
                          />
                        ) : (
                          <IconEyeClosed
                            className="w-10 h-10"
                            onClick={() => {
                              setPassVisible(() => {
                                return !passVisible;
                              });
                            }}
                          />
                        )}
                      </div>
                      {passwordError && (
                        <div className="text-red-500 text-sm mt-1">
                          {passwordError}
                        </div>
                      )}
                    </div>

                    {/* tell them requirements of the password */}

                    <div className="py-2 flex flex-wrap gap-2 w-[34rem] justify-between">
                      <div className="flex gap-2 items-center text-xl min-w-[14rem]">
                        {passLength > 7 ? (
                          <IconCircleCheckFilled className="w-7 h-7" />
                        ) : (
                          <IconCircleFilled className="w-7 h-7" />
                        )}
                        Minimum 8 Characters
                      </div>
                      <div className="flex gap-2 items-center text-xl min-w-[14rem]">
                        {hasNumber ? (
                          <IconCircleCheckFilled className="w-7 h-7" />
                        ) : (
                          <IconCircleFilled className="w-7 h-7" />
                        )}
                        1 Number
                      </div>
                      <div className="flex gap-2 items-center text-xl min-w-[14rem]">
                        {hasSymbol ? (
                          <IconCircleCheckFilled className="w-7 h-7" />
                        ) : (
                          <IconCircleFilled className="w-7 h-7" />
                        )}
                        1 Special Character
                      </div>
                      <div className="flex gap-2 items-center text-xl min-w-[14rem]">
                        {hasCapital ? (
                          <IconCircleCheckFilled className="w-7 h-7" />
                        ) : (
                          <IconCircleFilled className="w-7 h-7" />
                        )}
                        1 Capital Letter
                      </div>
                    </div>

                    <div className="mt-12">
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-primary-content bg-transparent tracking-wide">
                          Confirm Master Password
                        </div>
                      </div>
                      <div className="flex flex-row gap-6 w-[34rem]">
                        <input
                          className="w-full text-lg py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent"
                          type={passVisible ? "text" : "password"}
                          placeholder="Enter your password"
                          onChange={checkPasswordMatch}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 items-center text-xl my-4">
                      {passwordMatch ? (
                        <IconCircleCheckFilled className="w-7 h-7" />
                      ) : (
                        <IconCircleFilled className="w-7 h-7" />
                      )}
                      Passwords Match
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div id="comment" className="text-2xl text-center mb-4 text-accent">
              Enter Credentials to Sign Up!
            </div>
            <div className="flex justify-center">
              <div className="mt-2 w-96 flex justify-center">
                <button
                  className="bg-primary p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primary-focus text-primary-content shadow-lg text-2xl cursor-pointer"
                  onClick={handleSubmit}
                  // disabled={
                  // 	!passwordMatch ||
                  // 	!hasCapital ||
                  // 	!hasNumber ||
                  // 	!hasSymbol ||
                  // 	!passLength ||
                  // 	!email ||
                  // 	!username ||
                  // 	!password
                  // }
                  id="mainbutton"
                >
                  Send OTP
                </button>
              </div>
            </div>
            <div className="mt-4 text-xl font-display font-semibold text-primary-content text-center">
              Already have an account ?{" "}
              <NavLink
                className="cursor-pointer text-accent hover:text-accent-focus"
                to="/"
              >
                Log in
              </NavLink>
            </div>
          </div>
          <div className="hidden lg:flex items-start flex-col bg-primary w-1/3 h-screen p-4">
            <div className="py-8 bg-base-100 lg:bg-transparent flex justify-end lg:justify-end lg:px-12 w-full">
              <div className="cursor-pointer flex items-center mb-0 justify-end">
                <div className="text-4xl text-primary-content tracking-wide ml-2 font-semibold">
                  Anti Brutus
                </div>
                <div id="brutuslogo" className="w-16 h-16 m-4"></div>
              </div>
            </div>

            <div className="max-w-xs transform duration-200 hover:scale-105 cursor-pointer">
              <div id="mainsvgsignup" className="w-[50rem] h-[50rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
