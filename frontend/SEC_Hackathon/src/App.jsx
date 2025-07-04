import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Important for styling!
import Home from "./Home.jsx";
import Dashboard from "./Dash.jsx";
import Expenses from "./Expenses.jsx";
import Chatbot from "./Chatbot.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Navbar from "./Navbar.jsx"; 

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes> 
        <ToastContainer position="top-center" autoClose={1000} />
      </div>
    </Router>
  );
};

export default App;
