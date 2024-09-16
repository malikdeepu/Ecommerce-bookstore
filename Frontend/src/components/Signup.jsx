import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:6400/api/user/signup",
        data
      );
      setSuccessMessage(response.data.message || "Signup successful!");
      setErrorMessage("");
      // Optionally redirect to login or another page
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Error during signup"
      );
      setSuccessMessage("");
    }
  };

  return (
    <div
      id="signup-modal"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
    >
      <div className="w-full max-w-lg lg:max-w-xl border-[2px] shadow-md p-5 rounded-lg bg-white dark:bg-slate-900 dark:text-white">
        <button
          type="button"
          className="btn btn-sm text-black btn-circle btn-ghost absolute right-2 top-2 dark:text-white"
          onClick={() => window.history.back()}
        >
          ✕
        </button>
        <h3 className="font-bold text-black text-lg dark:text-white text-center">
          Signup
        </h3>
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="dark:bg-slate-900 dark:text-white pt-4 space-y-2">
            <label className="text-black dark:bg-slate-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="dark:bg-slate-900 dark:text-white w-full px-3 py-2 border rounded-md outline-none text-black"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          <div className="dark:bg-slate-900 dark:text-white pt-4 space-y-2">
            <label className="text-black dark:bg-slate-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="dark:bg-slate-900 dark:text-white w-full px-3 py-2 border rounded-md outline-none text-black"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red-500">Username is required</p>
            )}
          </div>
          <div className="dark:bg-slate-900 dark:text-white pt-4 space-y-2">
            <label className="text-black dark:bg-slate-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="dark:bg-slate-900 dark:text-white w-full px-3 py-2 border rounded-md outline-none text-black"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-around pt-6 gap-4 md:gap-8 text-black dark:bg-slate-900 dark:text-white">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-700 duration-200 text-white px-6 py-2 rounded-md w-full md:w-auto"
            >
              Sign up
            </button>
            <p className="text-center md:text-left">
              Already have an account?
              <span className="underline pl-2 text-blue-500">
                <Link to="/">Login</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
