import React from "react";
import "./Blob.css";

const Blob = () => {
  return (
    <div className="blobcontainer ">
      <div className="square linkedin">
        <span></span>
        <span></span>
        <span></span>
        <div className="blobcontent">
          <h2>Empowering Decision Making through Intelligent Insights:</h2>
          <p className="text">
            Envision your AIML project as a tool that empowers individuals or
            organizations by providing intelligent insights for better
            decision-making.
          </p>
        </div>
      </div>

      <div className="square twitter">
        <span></span>
        <span></span>
        <span></span>
        <div className="blobcontent">
          <h2>Fostering Innovation and Problem-Solving:</h2>
          <p className="text">
            Position your project as a catalyst for innovation and
            problem-solving within a specific industry or field. Express the
            vision of leveraging AI and ML to tackle complex challenges, driving
            advancements, and fostering a culture of continuous improvement.
          </p>
        </div>
      </div>

      <div className="square github">
        <span></span>
        <span></span>
        <span></span>
        <div className="blobcontent">
          <h2>Ensuring Ethical and Inclusive AI Practices:</h2>
          <p className="text">
            Emphasize a commitment to ethical AI practices and inclusivity in
            your project's vision. Highlight the importance of developing AI
            models and systems that prioritize fairness, transparency, and
            accountability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blob;
