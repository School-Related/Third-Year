import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";
import "../Button/Button.css";

const Form = () => {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    workplace: "",
    city: "",
    github: "",
  });

  // State to manage form errors
  const [formErrors, setFormErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error for the current field when the user starts typing
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validate the form
  const validateForm = () => {
    const errors = {};
    // Check if required fields are empty
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = "This field is required";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Form is valid if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the form
    if (validateForm()) {
      try {
        // Send form data as JSON to the server
        const response = await axios.post(
          "http://localhost:8000/submit",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle the response from the server, if needed
        console.log("Server response:", response.data);

        // Redirect to "/summary" after successful form submission
        navigate("/Summary");
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle the error, show a message to the user, etc.
      }
    } else {
      console.log("Form is not valid. Please check the errors.");
    }
  };

  return (
    <div className="formbody">
      <div className="formcontainer">
        <div className="formtext">Wanna Find something Crazy?</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
                placeholder="Enter your First Name"
              />
              <div className="underline"></div>
              <label htmlFor="first_name" className="formlabel"></label>
              <div className="error-message">{formErrors.first_name}</div>
            </div>
            <div className="input-data">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                placeholder="Enter your Last Name"
              />
              <div className="underline"></div>
              <label htmlFor="last_name" className="formlabel"></label>
              <div className="error-message">{formErrors.last_name}</div>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your Email Address"
              />
              <div className="underline"></div>
              <label htmlFor="email" className="formlabel"></label>
              <div className="error-message">{formErrors.email}</div>
            </div>
            <div className="input-data">
              <input
                type="text"
                name="workplace"
                value={formData.workplace}
                onChange={handleInputChange}
                required
                placeholder="Enter your Workplace"
              />
              <label htmlFor="workplace" className="formlabel"></label>
              <div className="error-message">{formErrors.workplace}</div>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                placeholder="Enter your City"
              />
              <div className="underline"></div>
              <label htmlFor="city" className="formlabel"></label>
              <div className="error-message">{formErrors.city}</div>
            </div>
            <div className="input-data">
              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                required
                placeholder="Enter your GitHub ID"
              />
              <label htmlFor="github" className="formlabel"></label>
              <div className="error-message">{formErrors.github}</div>
            </div>
          </div>
          <div className="mybutton">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
