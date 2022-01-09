import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import MyNavbar from "./components/MyNavbar";
import BookTicket from "./screens/BookTicket";
import About from "./screens/About";
import Contact from "./screens/Contact";
import AllTickets from "./screens/AllTickets";

function routes() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tickets" element={<AllTickets />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book/:busId/:dateOfJourney" element={<BookTicket />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default routes;
