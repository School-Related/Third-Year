import React from "react";
import { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../css/About.css";
import Developers from "./Developers";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const developers = [
  {
    name: "Krishnaraj Thadesar",
    github: "https://www.github.com/KrishnarajT",
    phone: "+91 9834312135",
    whatsapp: "https://wa.link/zu05s5",
    mail: "mailto:kpt.krishnaraj@gmail.com",
    image: "krishnaraj",
  },
  {
    name: "Sourab Karad",
    github: "https://github.com/sourab777karad",
    phone: "+91 6281819844",
    whatsapp: "https://wa.me/qr/XXI2PFLHKZH6G1",
    mail: "mailto: karadsaisourab9@gmail.com",
    image: "karad",
  },
  {
    name: "Parth Zarekar",
    github: "https://github.com/Parth4123",
    phone: "+91 8796180288",
    whatsapp: "https://wa.link/biyqac",
    mail: "mailto:parthzarekar@gmail.com",
    image: "parth",
  },
  {
    name: "Saubhagya Singh",
    github: "https://www.github.com/SaubhagyaSingh",
    phone: "+91 7007084088",
    whatsapp: "https://wa.link/vphagl",
    mail: "mailto: saubhagyasingh65@gmail.com",
    image: "saubhagya",
  },
];

const About = () => {
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
  return (
    <div>
      <div
        className="flex justify-center p-4 flex-col align-middle items-center"
        id="how"
      >
        <div className="text-base-content text-5xl p-4 text-center rounded-full px-16 outline-secondary outline">
          Developers
        </div>
        <div className="flex flex-wrap flex-row gap-16 items-center justify-center align-middle mx-10">
          <Developers data={developers[0]} />
          <Developers data={developers[1]} />
        </div>
        <div className="flex flex-wrap flex-row gap-16 items-center justify-center align-middle mx-10">
          <Developers data={developers[2]} />
          <Developers data={developers[3]} />
        </div>

        <div className="text-base-content text-6xl p-4 text-center rounded-full px-16 outline-secondary outline m-20">
          Credits and Thanks
        </div>
        <div className="text-base-content text-3xl p-8 bg-base-200 rounded-3xl flex flex-col items-center outline mb-16 text-center">
          Huge thanks to DaisyUI for the CSS framework, and Heroicons for the
          icons. Here are the links:
          <br></br>
          <div className="flex m-4 p-4 flex-wrap">
            <a
              href="https://daisyui.com/"
              className="outline rounded-full m-4 p-4 text-center self-center hover:bg-neutral hover:text-neutral-content"
            >
              {" "}
              DaisyUI{" "}
            </a>
            <br></br>
            <a
              href="https://heroicons.com/"
              className="outline rounded-full m-4 p-4 text-center self-center hover:bg-neutral hover:text-neutral-content"
            >
              {" "}
              Hero Icons{" "}
            </a>
            <a
              href="https://tabler-icons.io/"
              className="outline rounded-full m-4 p-4 text-center self-center hover:bg-neutral hover:text-neutral-content"
            >
              {" "}
              Tabler Icons{" "}
            </a>
            <a
              href="https://www.tailwindcss.com/"
              className="outline rounded-full m-4 p-4 text-center self-center hover:bg-neutral hover:text-neutral-content"
            >
              {" "}
              TailwindCSS{" "}
            </a>
            <a
              href="https://react.dev/"
              className="outline rounded-full m-4 p-4 text-center self-center hover:bg-neutral hover:text-neutral-content"
            >
              {" "}
              ReactJS{" "}
            </a>
          </div>
          This project was made as a part of the assignments for Full Stack
          Development Course at MIT WPU.
          <br></br>
          We are grateful to our teachers, and our parents for encouraging us to
          keep trying new stuff, without any restrictions.
          <br></br>
          None of this would be possible without their help.
          <br></br>
          <br></br>
          We are also grateful to our friends, for their inputs on the looks and
          features of the website, and for constantly encourating us to keep
          going.
        </div>
      </div>
      <div className="toast toast-bottom toast-center duration-300 transform-gpu ease-in-out hidden md:toast-end">
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

export default About;
