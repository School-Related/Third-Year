import React, { useState } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Random = () => {
  const { theme } = React.useContext(ThemeContext);
  useEffect(() => {
    if (theme === "light") {
      const light_button = document.getElementById("light_button");
      light_button.click();
    } else {
      const dark_button = document.getElementById("dark_button");
      dark_button.click();
    }
  });
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [passwordLength, setPasswordLength] = useState(8);
  const [password, setPassword] = useState("Generate!");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "includeNumbers":
        setIncludeNumbers(checked);
        break;
      case "includeSymbols":
        setIncludeSymbols(checked);
        break;
      case "includeUppercase":
        setIncludeUppercase(checked);
        break;
      default:
        break;
    }
  };

  const handlePasswordLengthChange = (event) => {
    setPasswordLength(event.target.value);
  };
  const generatePassword = (
    length,
    includeNumbers,
    includeSymbols,
    includeUppercase,
  ) => {
    let result = "";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%&*";

    let characters = lowercaseLetters;
    if (includeUppercase) {
      characters += uppercaseLetters;
    }
    if (includeNumbers) {
      characters += numbers;
    }
    if (includeSymbols) {
      characters += symbols;
    }

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    if (
      (includeNumbers && !result.match(/\d/)) ||
      (includeSymbols && !result.match(/[!@#$%&*]/)) ||
      (includeUppercase && !result.match(/[A-Z]/))
    ) {
      return generatePassword(
        length,
        includeNumbers,
        includeSymbols,
        includeUppercase,
      );
    }

    return result;
  };
  function onGeneratePasswordClick() {
    const password = generatePassword(
      passwordLength,
      includeNumbers,
      includeSymbols,
      includeUppercase,
    );
    setPassword(password);
  }

  function onClickCopyPassword() {
    navigator.clipboard.writeText(password);
    // show the toast
    const toast = document.querySelector(".toast");
    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 2000);
  }

  return (
    <div className="overflow-hidden">
      <div className="flex justify-center p-4">
        <div className="text-base-content text-5xl p-4 text-center rounded-full px-16 outline-secondary outline m-4">
          Create A Random Password
        </div>
      </div>

      {/* main content.  */}
      <div className="flex lg:flex-row min-h-fit lg:gap-24 lg:justify-evenly flex-col gap-4">
        {/* tweak params */}
        <div className="outline p-4 flex-1 m-16 rounded-3xl outline-secondary h-fit">
          <div className="flex justify-center p-4">
            <div className="text-base-content text-5xl p-4">
              Tweak Input Parameters
            </div>
          </div>
          <div className="flex justify-center flex-col items-center">
            <div className="flex justify-between w-96 items-center">
              <span className=" text-3xl m-4 label-text">Include Numbers</span>
              <input
                type="checkbox"
                className="toggle toggle-lg toggle-primary"
                name="includeNumbers"
                checked={includeNumbers}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="flex justify-between w-96 items-center">
              <span className=" text-3xl m-4 label-text">Include Symbols</span>
              <input
                type="checkbox"
                className="toggle toggle-lg toggle-primary"
                name="includeSymbols"
                checked={includeSymbols}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="flex justify-between w-96 items-center">
              <span className=" text-3xl m-4 label-text">
                Include Uppercase
              </span>
              <input
                type="checkbox"
                className="toggle toggle-lg toggle-primary"
                name="includeUppercase"
                checked={includeUppercase}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="flex justify-between w-96 items-center">
              <span className=" text-3xl m-4 label-text">Password Length</span>
              <span className=" text-3xl m-4 label-text">{passwordLength}</span>
            </div>
            <div>
              <input
                type="range"
                min={0}
                max="16"
                value={passwordLength}
                className="range w-80 mt-4"
                step="2"
                onChange={handlePasswordLengthChange}
              />
              <div className="w-80 flex justify-between text-xs px-1">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="btn btn-secondary text-base-content-content text-2xl rubik m-4 mt-8"
              onClick={onGeneratePasswordClick}
            >
              Generate Password
            </button>
          </div>
        </div>
        {/* display password */}
        <div className="outline p-4 flex-1 m-16 rounded-3xl outline-secondary h-96">
          <div className="flex justify-center p-4">
            <div className="text-base-content text-5xl p-4">
              Your Generated Password :
            </div>
          </div>
          <div className="flex justify-center p-4">
            <div className="text-neutral-content text-5xl p-8 bg-neutral rounded-full text-center self-center place-items-center place-self-center min-w-fit">
              {password}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="btn btn-secondary text-base-content-content text-2xl rubik m-4 mt-8"
              onClick={onClickCopyPassword}
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
      <div className="toast toast-end duration-300 transform-gpu ease-in-out hidden">
        <div className="alert alert-success">
          <span className="flex items-center gap-4 text-2xl">
            <CheckBadgeIcon className="w-10 h-10" />
            Copied to Clipboard!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Random;
