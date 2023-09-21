import React from "react";
import "../css/GeneratorHome.css";
import { ReactComponent as PassSVGLight } from "../assets/undraw_fingerprint_login_re_t71l.svg";
import { ReactComponent as PassSVGDark } from "../assets/undraw_fingerprint_login_re_t71l.svg";
import Card from "../components/Card";

import {
  AcademicCapIcon,
  HashtagIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

import { ThemeContext } from "../context/ThemeContext";
import { useEffect } from "react";

const GeneratorHome = () => {
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

  const random_text =
    "Create a totally random password by checking some boxes, and deciding what kind of password you want. This is perfect if you want a secure password for something that you aren't going to visit often, and will always have access to this website, or your generated password. ";
  const hashed_text =
    "Create a password that has the necessary symbols to be used on any site, but it will be the hash of a simpler password that you can remember. This is perfect for websites where you need a very secure password, that no one can guess, and you may not have access to this website. ";
  const master_text =
    "Create a password that will be based on a single master password that you will always remember. You can then add details about the respective website, and a hash combining both passwords will be generated. This is for websites where security is paramount, but you access it often. It is for those that are bad at remembering passwords. ";
  return (
    <div className="min-h-screen">
      <div className="flex flex-row justify-between p-8">
        <div
          className={
            theme === "light"
              ? "flex flex-col items-start align-middle justify-center svgthing"
              : "flex flex-col items-start align-middle justify-center svgthingdark"
          }
        >
          <div className="text-9xl titillium">
            Generate your Own Secure Passwords!
          </div>
          <button
            className="btn btn-primary rounded-full mt-20 text-5xl p-6 w-96 h-32 rubik shadow-xl"
            onClick={() => {
              window.location.href = "#def";
            }}
          >
            Try
          </button>
        </div>
        {theme === "light" ? <PassSVGLight /> : <PassSVGDark />}
      </div>
      <div className="flex justify-start p-4 m-2">
        <div className="text-3xl p-4 w-3/6">
          Tired of using the same password for everything? Annoyed at having to
          add symbols and Numbers to your passwords? Why not make your own
          unique password that is easy to remember and secure!
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <section id="def" className="">
        <div className="flex flex-row gap-12 p-4 justify-center">
          <Card
            id="randomcard"
            text={random_text}
            title={"Random"}
            icon={<QuestionMarkCircleIcon className="w-14 h-14" />}
          />
          <Card
            id="hashedcard"
            text={hashed_text}
            title={"Hashed"}
            icon={<HashtagIcon className="w-14 h-14" />}
          />
          <Card
            id="mastercard"
            text={master_text}
            title={"Master"}
            icon={<AcademicCapIcon className="w-14 h-14" />}
          />
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default GeneratorHome;
