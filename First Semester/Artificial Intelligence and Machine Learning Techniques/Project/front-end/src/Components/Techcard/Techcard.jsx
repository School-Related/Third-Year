import React from "react";
import "./Techcard.css";
import fast from "../../Resources/Images/fast.png";
import reactimg from "../../Resources/Images/react.png";
import pyimg from "../../Resources/Images/python.png";

const Techcard = () => {
  return (
    <div className="techcardbodycontainer">
      <div class="techcontainer">
        <div class="techcard" id="card1">
          <div class="techface techface1">
            <div class="techcontent">
              <img src={reactimg} />
              <h3 className="text">React</h3>
            </div>
          </div>
          <div class="techface techface2">
            <div class="techcontent">
              {" "}
              <p className="description">
                React is a JavaScript library widely used for building
                component-based architecture and virtual DOM enable efficient
                rendering, providing a seamless user experience for interactive
                AI-driven interfaces.
              </p>
            </div>
          </div>
        </div>
        <div class="techcard">
          <div class="techface techface1">
            <div class="techcontent">
              <img src={fast} />
              <h3 className="text">Fastapi</h3>
            </div>
          </div>
          <div class="techface techface2">
            <div class="techcontent">
              <p className="description">
                FastAPI, a modern, fast , web framework for building APIs with
                Python 3.7+ based on standard Python type hints, is an excellent
                choice for backend development in AIML projects.
              </p>
            </div>
          </div>
        </div>
        <div class="techcard">
          <div class="techface techface1">
            <div class="techcontent">
              <img src={pyimg} />
              <h3 className="text">Python</h3>
            </div>
          </div>
          <div class="techface techface2">
            <div class="techcontent">
              <p className="description">
                Python serves as the foundational language for AIML development,
                offering a rich ecosystem of libraries and frameworks. Its
                simplicity and readability make it an ideal choice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Techcard;
