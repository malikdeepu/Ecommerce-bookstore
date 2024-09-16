import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here, e.g., send the data to an API
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-md border-2 border-gray-300 dark:border-gray-700 shadow-md p-6 rounded-lg bg-white dark:bg-gray-900">
            <h3 className="font-bold text-xl text-center text-black dark:text-white mb-4">
              Contact Us
            </h3>
            <Link to="/">
              <button
                type="button"
                className="btn btn-sm text-black btn-circle btn-ghost absolute right-2 top-2 dark:text-white"
                onClick={() => document.getElementById("my_modal_3")?.close()}
              >
                ✕
              </button>
            </Link>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none bg-white dark:bg-gray-700 text-black dark:text-white"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">Name is required</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none bg-white dark:bg-gray-700 text-black dark:text-white"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black dark:text-white">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter the subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none bg-white dark:bg-gray-700 text-black dark:text-white"
                  {...register("subject", { required: true })}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">Subject is required</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black dark:text-white">
                  Message
                </label>
                <textarea
                  placeholder="Enter your message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none bg-white dark:bg-gray-700 text-black dark:text-white"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">Message is required</p>
                )}
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-700 text-white px-6 py-2 rounded-md font-medium duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
