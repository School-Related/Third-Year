import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import About from "./pages/About";
import Vision from "./pages/Vision";
import Search from "./pages/Search";
import Summary from "./pages/Summary";
import Features from "./pages/Features";
import "../../frontend/src/App.css";
function App() {
  return (
    <Router>
      <div className="hero">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/About_us" element={<About />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="/Vision" element={<Vision />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
