import React from "react";
import list from "../../public/list.json"; // Adjust the path if necessary
import Navbar from "./Navbar"; // Navbar is in the same directory

import Cards from "./Cards";
import { Link } from "react-router-dom"; // Correct import for Link

function Course() {
  console.log(list); // Logs the JSON data to the console

  return (
    <>
      <Navbar />
      <div className="mr-8 ml-8 pt-16">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl ">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            deleniti nemo laborum illo repellat sit eius placeat doloribus nihil
            aperiam maiores, impedit porro perspiciatis, magni possimus? Rem
            eaque quod voluptates. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Cumque facilis quia deserunt recusandae sunt
            praesentium dicta unde, a hic? Ipsam error obcaecati consequatur
          </p>
          <Link to="/">
            <button className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-700 duration-300 mt-6">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {list.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
