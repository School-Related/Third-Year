import React from "react";
import { Link, useNavigate } from "react-router-dom";
import vid from "../../Resources/Videos/bg1.mp4";
import "../Landing/Landing.css";
const Landing = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg">
      <video src={vid} autoPlay muted />
      <div className="content">
        <h1 className="main-heading">NFS</h1>
        <h2 className="desc">Need For Security</h2>
        <h1>MOST WANTED</h1>
        <div className="word">
          <button
            className="wheel"
            onClick={() => handleButtonClick("/Search")}
            id="option4"
          ></button>
          <button
            className="wheel"
            onClick={() => handleButtonClick("/About_us")}
            id="option2"
          ></button>
          <button
            className="wheel"
            onClick={() => handleButtonClick("/Vision")}
            id="option1"
          ></button>
          <button
            className="wheel "
            onClick={() => handleButtonClick("/Features")}
            id="option3"
          ></button>
          <div className="Options rise">
            <span>Search</span>
            <span> About us</span>
            <span> Vision</span>
            <span> Key Features</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
