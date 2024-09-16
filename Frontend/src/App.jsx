import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import ContactUs from "./components/ContactUs";
import Cart from "./components/Cart";
import Purchase from "./components/Purchase"; // Import the Purchase component

function App() {
  return (
    <>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<Purchase />} />{" "}
          {/* Add the Purchase route */}
        </Routes>
      </div>
    </>
  );
}

export default App;
