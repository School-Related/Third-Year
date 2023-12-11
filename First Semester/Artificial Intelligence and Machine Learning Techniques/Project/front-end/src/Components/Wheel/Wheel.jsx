import React from "react";
import "./Wheel.css";
import { Link, useNavigate } from "react-router-dom";

const Wheel = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };
  return (
    <div>
      <div className="menu">
        <a className="navheading" href="/">
          NFS MOST-WANTED
        </a>
        <div className="menuopt">
          <button
            className="wheel1"
            onClick={() => handleButtonClick("/Search")}
            id="option4"
          ></button>
          <div>
            <a className="rise" href="/Search">
              Search
            </a>
          </div>
        </div>
        <div className="menuopt">
          <button
            className="wheel1"
            onClick={() => handleButtonClick("/About_us")}
            id="option2"
          ></button>
          <div>
            <a className="rise" href="/About_us">
              About Us
            </a>
          </div>
        </div>
        <div className="menuopt">
          <button
            className="wheel1"
            onClick={() => handleButtonClick("/Vision")}
            id="option1"
          ></button>
          <div>
            <a className="rise" href="/Vision">
              Vision
            </a>
          </div>
        </div>
        <div className="menuopt">
          <button
            className="wheel1 lastopt"
            onClick={() => handleButtonClick("/Features")}
            id="option3"
          ></button>
          <div>
            <a className="rise" href="Features">
              Key Features
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
