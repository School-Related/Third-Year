import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Card from "../Components/Card/Card";
import "./About.css"; // Import the CSS file
import Techcard from "../Components/Techcard/Techcard";
import Projectdesc from "../Components/Projectdesc/Projectdesc.jsx";

const About = () => {
  return (
    <div className="aboutfullbody">
      <Navbar></Navbar>
      <div className="aboutbody">
        <div className="devscard-container">
          <Card></Card>
        </div>
      </div>

      <div className="project-section" id="prob">
        <section>
          <h1 className="project-heading"> Credits and Thanks</h1>
          <div class="midtext">
            <br />
            <br />
            <p>
              {" "}
              This project was made as a part of the assignments for AIMLT
              Course at MIT WPU.
              <br></br>
              We are grateful to our teachers, and our parents for encouraging
              us to keep trying new stuff, without any restrictions.
              <br></br>
              None of this would be possible without their help.
              <br></br>
              <br></br>
              We are also grateful to our friends, for their inputs on the looks
              and features of the website, and for constantly encouraging us to
              keep going.
            </p>
          </div>
        </section>
      </div>

      <div className="technology-section">
        <section>
          <h1 className="about-heading"> Technology Stack:</h1>
          <Techcard />
        </section>
      </div>
      <div className="go-ahead-section">
        <Projectdesc />
      </div>
    </div>
  );
};

export default About;
