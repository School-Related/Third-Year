// Loading.jsx

import React, { useState, useEffect } from "react";
import "./Loading.css";

const Loading = () => {
  const [load, setLoad] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const loadingNumber = document.querySelector("#loadingNumber");
    const loadingCircle = document.querySelector(".loading-circle");

    const updateLoader = () => {
      setLoad((prevLoad) => (prevLoad < 100 ? prevLoad + 1 : prevLoad));
      loadingNumber.innerHTML = load;
      loadingCircle.style.background = `conic-gradient(from 0deg at 50% 50%, rgba(111, 123, 247, 1) 0%, rgba(155, 248, 244, 1) ${load}%, #101012 ${load}%)`;
    };

    const interval = setInterval(updateLoader, 100);

    // Hide the loading box after 15 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
      clearInterval(interval);
    }, 13000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [load]);

  return (
    <div className={`summarybody ${isVisible ? "visible" : "hidden"}`}>
      <div className="loading-box">
        <p className="loading-title">Loading</p>
        <div className="loading-circle">
          <p className="loading-count">
            <span id="loadingNumber">{load}</span>%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
