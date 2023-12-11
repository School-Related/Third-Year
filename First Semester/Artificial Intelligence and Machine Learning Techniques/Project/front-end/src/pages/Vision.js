import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import "./Vision.css";
import Blob from "../Components/Blob/Blob";
import Card3 from "../Components/Card3/Card3";
const Vision = () => {
  return (
    <div>
      <Navbar />
      <p className="about"> Our Vision</p>
      <Blob />
      <Card3 />
    </div>
  );
};

export default Vision;
