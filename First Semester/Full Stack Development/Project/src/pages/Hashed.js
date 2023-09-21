import React, { useState } from "react";
import sha256 from "js-sha256";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Hashed = () => {
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
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [passwordLength, setPasswordLength] = useState(8);
  const [base_hash_string, setBaseHashString] = useState();
  const [password, setPassword] = useState("Generate!");
  const [whichth_position, setWhichthPosition] = useState(0);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
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
    regenerate_password(
      parseInt(event.target.value),
      parseInt(whichth_position),
    );
  };
  const handleWhichthPositionChanger = (event) => {
    setWhichthPosition(() => {
      regenerate_password(
        parseInt(passwordLength),
        parseInt(event.target.value),
      );
      return parseInt(event.target.value);
    });
  };

  const regenerate_password = (
    updated_password_length,
    updated_whichth_pos,
  ) => {
    const password = generatePassword(
      updated_password_length,
      includeSymbols,
      includeUppercase,
      base_hash_string,
      updated_whichth_pos,
    );
    if (password) {
      setPassword(password);
    }
  };

  const generatePassword = (
    length,
    includeSymbols,
    includeUppercase,
    base_hash_string,
    updated_whichth_pos,
  ) => {
    if (base_hash_string === undefined) {
      // base_hash_string = "password"
      window.my_modal_3.showModal();
      return;
    }
    if (updated_whichth_pos === undefined) {
      updated_whichth_pos = 0;
    }
    let result = "";
    let hashSubstring = "";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "!@#$%&*";

    const hash = sha256(base_hash_string);

    // use whichth position here to take a substring only from that position
    hashSubstring = hash.substring(
      updated_whichth_pos * length,
      (updated_whichth_pos + 1) * length,
    );
    // const hashSubstring = hash.substring(hash.length - length);
    if (includeSymbols && includeUppercase) {
      // find a random number between 0 and length
      // replace that character with a random uppercase letter
      // then replace the next character with a random symbol
      // do this only once.
      const randomIndex = Math.floor(Math.random() * length);
      const randomUppercaseIndex = Math.floor(
        Math.random() * uppercaseLetters.length,
      );
      const randomUppercase = uppercaseLetters[randomUppercaseIndex];
      const randomSymbolIndex = Math.floor(Math.random() * symbols.length);
      const randomSymbol = symbols[randomSymbolIndex];
      result =
        hashSubstring.substring(0, randomIndex) +
        randomUppercase +
        randomSymbol +
        hashSubstring.substring(randomIndex + 2);
    } else if (includeSymbols && !includeUppercase) {
      // find a random number between 0 and length
      // replace that character with a random symbol
      // do this only once.
      const randomIndex = Math.floor(Math.random() * length);
      const randomSymbolIndex = Math.floor(Math.random() * symbols.length);
      const randomSymbol = symbols[randomSymbolIndex];
      result =
        hashSubstring.substring(0, randomIndex) +
        randomSymbol +
        hashSubstring.substring(randomIndex + 1);
    } else if (includeUppercase && !includeSymbols) {
      // find a random number between 0 and length
      // replace that character with a random uppercase letter
      // do this only once.
      const randomIndex = Math.floor(Math.random() * length);
      const randomUppercaseIndex = Math.floor(
        Math.random() * uppercaseLetters.length,
      );
      const randomUppercase = uppercaseLetters[randomUppercaseIndex];
      result =
        hashSubstring.substring(0, randomIndex) +
        randomUppercase +
        hashSubstring.substring(randomIndex + 1);
    } else {
      result = hashSubstring;
    }
    return result;
  };
  function onGeneratePasswordClick() {
    const password = generatePassword(
      passwordLength,
      includeSymbols,
      includeUppercase,
      base_hash_string,
    );
    if (password) {
      setPassword(password);
      // enable the whichthpositionslider
      const whichth_position_slider = document.querySelector(
        "#whichth_position_slider",
      );
      whichth_position_slider.disabled = false;
    }
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
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-3xl">Give some Text!</h3>
          <p className="py-4 text-2xl">
            Please Enter some text to hash first, so we can generate a password
            for you!
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="flex justify-center p-4">
        <div className="text-base-content text-5xl p-4 text-center rounded-full px-16 outline-secondary outline m-4">
          Create A <span className="text-primary">SHA256</span> Hashed Password
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
            <div className="flex flex-col justify-between w-96 items-center">
              <span className=" text-3xl m-4 label-text text-center w-full">
                What do you wanna hash?
              </span>
              <input
                type="text"
                placeholder="Type here"
                value={base_hash_string}
                onChange={(e) => setBaseHashString(e.target.value)}
                className="input input-bordered input-lg w-full max-w-xs"
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
                min={4}
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
        <div className="outline p-4 flex-1 m-16 rounded-3xl outline-secondary h-fit items-center flex flex-col align-middle">
          <div className="flex justify-center p-4 flex-col align-middle items-center">
            <div className="text-base-content text-5xl p-4 text-center">
              Your Generated Password :
            </div>
          </div>
          <div className="flex justify-center p-4">
            <div className="text-neutral-content text-5xl p-8 bg-neutral rounded-full text-center self-center place-items-center place-self-center min-w-fit">
              {password}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-5/6">
            <input
              type="range"
              id="whichth_position_slider"
              min={0}
              max={Math.floor(64 / passwordLength) - 1}
              value={whichth_position}
              className="range w-full mt-4"
              step={1}
              onChange={handleWhichthPositionChanger}
              disabled={true}
            />
            <div className="w-full flex justify-between text-xs px-2">
              {[...Array(Math.floor(64 / passwordLength))].map((_, i) => (
                <span key={i}>|</span>
              ))}
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
          <div className="flex justify-center p-4 flex-col align-middle items-center">
            <div className="text-base-content text-2xl p-4 text-center">
              This password is the{" "}
              <span className="text-primary">SHA256 hash </span>of the text you
              entered, along with some letters substituted with symbols and
              uppercase letters, if you included them. This is a secure
              password, but you can always generate a new one if you don't like
              it. As you slide the slider, you will move across the hash,
              thereby generating new passwords.
            </div>
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

export default Hashed;
