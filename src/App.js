// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Potager from "./pages/Potager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/potager" element={<Potager />} />
      </Routes>
    </Router>
  );
}

export default App;
