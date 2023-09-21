import React, { useState } from "react";
import sha256 from "js-sha256";
import {
  CheckBadgeIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Master = () => {
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
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [master_password, setMasterPassword] = useState();

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
      master_password,
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
    master_password,
  ) => {
    if (updated_whichth_pos === undefined) {
      updated_whichth_pos = 0;
    }
    if (base_hash_string === undefined || master_password === undefined) {
      // base_hash_string = "password"
      window.my_modal_3.showModal();
      return;
    }
    let interleaved_string = "";
    // interleave the master password and the base_hash_string starting with the master password
    for (let i = 0; i < master_password.length; i++) {
      interleaved_string += master_password[i];
      interleaved_string += base_hash_string[i];
    }
    // if the master password is longer than the base_hash_string, then add the rest of the master password
    if (master_password.length > base_hash_string.length) {
      interleaved_string += master_password.substring(base_hash_string.length);
    }
    // if the base_hash_string is longer than the master password, then add the rest of the base_hash_string
    if (base_hash_string.length > master_password.length) {
      interleaved_string += base_hash_string.substring(master_password.length);
    }
    let result = "";
    let hashSubstring = "";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "!@#$%&*";

    const hash = sha256(interleaved_string);

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
      whichth_position,
      master_password,
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
          Create Many Passwords from a Master Password
        </div>
      </div>

      {/* main content.  */}
      <div className="flex lg:flex-row min-h-fit lg:gap-24 lg:justify-evenly flex-col gap-4">
        {/* tweak params */}
        <div className="outline p-4 flex-1 m-16 rounded-3xl outline-secondary h-fit ">
          <div className="flex justify-center p-4">
            <div className="text-base-content text-5xl p-4">
              Tweak Input Parameters
            </div>
          </div>
          <div className="flex justify-center flex-col items-center">
            <div className="flex flex-col justify-between w-full items-center">
              <span className=" text-3xl m-4 label-text text-center w-2/3">
                Enter your Master Password. Make sure to remember it well.
              </span>
              <div className="flex w-96 justify-between items-center">
                <input
                  id="master_password_input"
                  type="password"
                  placeholder="Enter Master Password"
                  value={master_password}
                  onChange={(e) => setMasterPassword(e.target.value)}
                  className="input input-bordered input-lg w-full max-w-xs"
                />
                <button
                  onClick={() => {
                    setPasswordHidden((prev) => {
                      const master_password_input = document.querySelector(
                        "#master_password_input",
                      );
                      master_password_input.type = passwordHidden
                        ? "text"
                        : "password";
                      return !prev;
                    });
                  }}
                >
                  {passwordHidden ? (
                    <EyeSlashIcon className="w-8 h-8" />
                  ) : (
                    <EyeIcon className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between w-full items-center">
              <span className=" text-3xl m-4 label-text text-center w-2/3">
                What is this password for? or enter any Unique identifier.
              </span>
              <input
                type="text"
                placeholder="Enter Identifier"
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
          <div className="flex justify-center">
            <button
              className="hover:scale-110 rubik m-4 mt-8 duration-200 transform-gpu"
              onClick={() => {
                window.location.href = "#how";
              }}
            >
              <InformationCircleIcon className="w-10 h-10" />
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
      <div
        className="flex justify-center p-4 flex-col align-middle items-center break-all"
        id="how"
      >
        <div className="text-base-content text-5xl p-4 text-center rounded-full px-16 outline-secondary outline">
          How does it work?
        </div>
        <div className="flex justify-center p-8 flex-col align-middle items-center">
          <div className="text-base-content text-3xl p-8 bg-base-200 rounded-3xl">
            This password is the{" "}
            <span className="text-secondary">SHA256 hash </span>of the text you
            entered, along with some letters substituted with symbols and
            uppercase letters, if you included them. This is a secure password,
            but you can always generate a new one if you don't like it. As you
            slide the slider, you will move across the hash, thereby generating
            new passwords.
            <br></br>
            <br></br>
            The Advantage of using this method is that you only need to bother
            to remember your master password. The rest you can always come back
            and calculate on this website. Even if you do not have access to
            this website for whatsoever reason, you can always calculate the
            password yourself, as long as you remember your master password.
          </div>

          <div className="text-base-content text-5xl p-4 text-center rounded-full px-16 outline-secondary outline m-8">
            Method
          </div>
          <div className="text-base-content text-3xl p-8 bg-base-200 rounded-3xl">
            <ol>
              <li>1. Your Master password is taken.</li>
              <li>
                2. It is interleaved with the text you entered as the
                identifier. This text could be the name of the website, or
                anything else that you can remember.
              </li>
              <li>3. The SHA256 hash of this interleaved string is taken.</li>
              <li>
                4. The hash is then split into chunks of length equal to the
                password length you chose.
              </li>
              <li>5. The chunk at the position you chose is taken.</li>
              <li>
                6. If you chose to include symbols and uppercase letters, then a
                random symbol and a random uppercase letter is inserted, both at
                random positions in the chunk.
              </li>
              <li>7. The resulting string is your password.</li>
            </ol>
          </div>

          <div className="text-base-content text-5xl p-4 text-center rounded-full px-16 outline-secondary outline m-8">
            Example
          </div>
          <div className="text-base-content text-3xl p-8 bg-base-200 rounded-3xl flex flex-col w-full items-center justify-center align-middle">
            <ol className="flex flex-col items-start justify-start text-left gap-6 w-full">
              <li>
                1. Master Password:{" "}
                <div className="text-secondary-content victormono p-4 px-8 outline m-4 rounded-full w-fit bg-secondary">
                  rabbit
                </div>
              </li>
              <li>
                2. Identifier:{" "}
                <div className="text-secondary-content victormono p-4 px-8 outline m-4 rounded-full w-fit bg-secondary">
                  amazon
                </div>
              </li>
              <li>
                3. Interleaved String:{" "}
                <div className="text-secondary-content victormono p-4 px-8 outline m-4 rounded-full w-fit bg-secondary">
                  raambabziotn
                </div>
              </li>
              <li>
                4. SHA256 Hash:{" "}
                <div className="text-secondary-content victormono p-4 px-8 outline m-4 rounded-full w-fit bg-secondary">
                  0d1ec65aa08aa40689de70630debb86b47a92f744f9f0d130087d2630e653507
                </div>
              </li>
              <li>
                5. Split into chunks of length 8:{" "}
                <div className="text-secondary-content victormono p-4 px-8 outline m-4 rounded-full w-fit bg-secondary">
                  0d1ec65a, a08aa406, 89de7063, 0debb86b, 47a92f74, 4f9f0d13,
                  0087d263, 0e653507
                </div>
              </li>
              <li>
                6. Chunk at position 0:{" "}
                <div className="text-secondary-content victormono p-4 px-8 outline m-4 rounded-full w-fit bg-secondary">
                  0d1ec65a
                </div>
              </li>
              <li>
                7. Insert random symbol and uppercase letter:{" "}
                <div className="text-secondary-content victormono p-4 px-8 outline m-4 rounded-full w-fit bg-secondary">
                  0d1ec65a
                </div>
                <div className="text-secondary-content victormono p-4 px-8 outline m-4 rounded-full w-fit bg-secondary">
                  !
                </div>
                <div className="text-secondary-content victormono p-4 px-8 outline m-4 rounded-full w-fit bg-secondary">
                  A
                </div>
              </li>
              <li>
                8. Resulting String:{" "}
                <div className="text-secondary-content victormono p-4 px-8 outline m-4 rounded-full w-fit bg-secondary">
                  0dAe!65a
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Master;
