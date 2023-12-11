import React from "react";
import "../Card/Card.css";
import karad from "../../Resources/Images/karad.jpeg";
import parth from "../../Resources/Images/parth.png";
import saubhagya from "../../Resources/Images/saubhagya.png";
import krishnaraj from "../../Resources/Images/krishnaraj.png";
import { FaSquareEnvelope } from "react-icons/fa6";
import { FaSquarePhone } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";

const Card = () => {
  return (
    <div>
      <h1 className="dev-heading">THE DEVELOPER TEAM</h1>
      <div className="devs">
        <div className="card">
          <div className="imgBx">
            <img alt="images" src={parth} />
          </div>
          <div className="details">
            <h2>
              Parth Zarekar <br />
              <span>CSF</span>
            </h2>
          </div>
        </div>

        <div className="card">
          <div className="imgBx">
            <img src={krishnaraj} alt="images" />
          </div>
          <div className="details">
            <h2>
              Krishnaraj
              <br />
              <span>Qatari</span>
            </h2>
          </div>
        </div>
        <div className="card">
          <div class="imgBx">
            <img src={saubhagya} alt="images" />
          </div>
          <div className="details">
            <h2>
              Saubhagya Singh
              <br />
              <span>Tryhard</span>
            </h2>
          </div>
        </div>
        <div className="card">
          <div className="imgBx">
            <img src={karad} alt="images" />
          </div>
          <div className="details">
            <h2>
              Sourab Karad
              <br />
              <span>Thala</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="iconsabout">
        <div className="parth dev1">
          <a href="/">
            <FaSquarePhone size="2.5rem" color="white" />
          </a>
          <a href="https://github.com/KrishnarajT">
            <FaGithub size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaSquareEnvelope size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaSquareWhatsapp size="2.5rem" color="white" />
          </a>
        </div>
        <div className="parth dev1">
          <a href="/">
            <FaSquarePhone size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaGithub size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaSquareEnvelope size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaSquareWhatsapp size="2.5rem" color="white" />
          </a>
        </div>
        <div className="Saubhagya dev1">
          <a href="/">
            <FaSquarePhone size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaGithub size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaSquareEnvelope size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaSquareWhatsapp size="2.5rem" color="white" />
          </a>
        </div>
        <div className="karad dev1">
          <a href="/">
            <FaSquarePhone size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaGithub size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaSquareEnvelope size="2.5rem" color="white" />
          </a>
          <a href="/">
            <FaSquareWhatsapp size="2.5rem" color="white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
