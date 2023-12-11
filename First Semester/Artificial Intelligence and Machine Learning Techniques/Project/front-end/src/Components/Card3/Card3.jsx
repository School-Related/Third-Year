import React from "react";
import "./Card3.css";
import qr from "../../Resources/Images/qr.jpg";
import rupees from "../../Resources/Images/rupees.png";
import saubhi from "../../Resources/Images/saubhagya.png";
import tools from "../../Resources/Images/tools.png";
const Card3 = () => {
  return (
    <div className="card3container">
      <div className="card-container">
        <a href="/" className="hero-image-container">
          <img className="hero-image" src={tools} alt="Spinning glass cube" />
        </a>
        <main className="main-content">
          <h1>
            <a>External Dependencies</a>
          </h1>
          <p>
            Since we have used the above given Services we can Provide Support
            to a limited Number of requests per month
          </p>
          <div className="flex-row">
            <div className="time-left">
              <h2>20 requests / month without support</h2>
            </div>
          </div>
        </main>
        <div className="card-attribute">
          <img src={saubhi} alt="avatar" className="small-avatar" />
          <p>
            Donate through UPI:
            <span>
              <a>7007084088@paytm</a>
            </span>
          </p>
        </div>
      </div>
      <div className="card-container">
        <a href="/" className="hero-image-container">
          <img className="hero-image" src={qr} alt="Spinning glass cube" />
        </a>
        <main className="main-content">
          <h1>
            <a>Support us by donating</a>
          </h1>
          <p>
            Our Software Solution provides Digital Awareness and Security to you
            for Free.To support us in our Endeavour Donate here.
          </p>
          <div className="flex-row">
            <div className="coin-base">
              <img src={rupees} alt="Ethereum" className="small-image" />
              <h2>Anything helps</h2>
            </div>
            {/* <div className="time-left">
              <img src={saubhi} alt="clock" className="small-image" />
              <p>3 days left</p>
            </div> */}
          </div>
        </main>
        <div className="card-attribute">
          <img src={saubhi} alt="avatar" className="small-avatar" />
          <p>
            Donate through UPI:
            <span>
              <a>7007084088@paytm</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card3;
