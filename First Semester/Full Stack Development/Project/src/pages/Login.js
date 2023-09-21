import React, { useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { UserInfoContext } from "../context/UserInfoContext";
import "../css/Navbar.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const base_url = React.useContext(BaseUrlContext).baseUrl;
  const setUserInfo = React.useContext(UserInfoContext).setUserInfo;

  const comment = document.getElementById("comment");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  let navigate = useNavigate();

  function redirect() {
    props.setisNavbarPresent(true);
    setUserInfo(email);
    navigate("/home");
  }

  async function handleClick() {
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
      // comment.innerHTML = "Login Successful! Redirecting to Home Page!";
      setTimeout(() => {
        redirect();
      }, 1000);
    }
    // check if the user exists in the database
    else if (response.data.message === "user found pass correct") {
      setTimeout(() => {
        redirect();
      }, 1000);
    } else if (response.data.message === "user found pass incorrect") {
      comment.innerHTML = "Password Incorrect! Try Again!";
    } else if (response.data.message === "user not found") {
      comment.innerHTML = "User Doesnt Exist! Try Again or Sign Up!";
    } else {
      comment.innerHTML = "Something went wrong! Call the Devs!";
      alert("Something went wrong! Call the Devs!");
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
      );
    } else {
      setPasswordError("");
      handleClick();
    }
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
                Log in
              </h2>
              <div
                className="text-center text-xl text-secondary font-display font-semibold lg:text-left xl:text-xl
              xl:text-bold rubik pt-3"
              >
                <span className="italic">
                  “There are no tricks in plain and simple faith.”{" "}
                </span>
                <br></br>
                <span className="text-accent">
                  {" "}
                  Brutus to Lucillius, Act 4, Scene 2
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
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <div className="text-red-500 text-sm mt-1">
                        {emailError}
                      </div>
                    )}
                  </div>
                  <div className="mt-8">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-primary-content bg-transparent tracking-wide">
                        Master Password
                      </div>
                      <div>
                        <NavLink
                          className="text-xl font-display font-semibold text-accent hover:text-accent-focus
                                  cursor-pointer"
                          to="/fpass"
                        >
                          Forgot Password?
                        </NavLink>
                      </div>
                    </div>
                    <input
                      className="w-full text-lg py-2 border-b border-primary focus:outline-none focus:border-accent bg-transparent"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                      <div className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </div>
                    )}
                  </div>
                  <div
                    id="comment"
                    className="text-xl text-center mt-10 text-accent"
                  >
                    Enter Credentials to Log In!
                  </div>
                  <div className="mt-10">
                    <button
                      className="bg-primary p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primary-focus text-primary-content
                          shadow-lg text-xl cursor-pointer"
                      type="submit"
                    >
                      Log In
                    </button>
                  </div>
                </form>
                <div className="mt-12 text-xl font-display font-semibold text-primary-content text-center">
                  Don't have an account ?{" "}
                  <NavLink
                    className="cursor-pointer text-accent hover:text-accent-focus"
                    to="/signup"
                  >
                    Sign up
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center bg-indigo-200 flex-1 h-screen">
            <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
              <div id="mainsvg" className="w-[50rem] h-[40rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
