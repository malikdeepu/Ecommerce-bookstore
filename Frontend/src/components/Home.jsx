import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Freebook from "./Freebook";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-14">
        <Banner />
      </div>
      <Freebook />
      <Footer />
    </>
  );
}

export default Home;
