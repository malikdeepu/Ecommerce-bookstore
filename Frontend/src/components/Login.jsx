import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Define your onSubmit function
  const onSubmit = (data) => {
    console.log(data);
    // You can handle the login logic here
  };

  return (
    <>
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box dark:bg-slate-900 dark:text-white">
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              {/* Close button */}
              <Link to="/">
                <button
                  type="button"
                  className="btn btn-sm text-black btn-circle btn-ghost absolute right-2 top-2 dark:text-white"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  ✕
                </button>
              </Link>

              <h3 className="font-bold text-black text-lg dark:bg-slate-900 dark:text-white">
                Login
              </h3>
              <div className="dark:bg-slate-900 dark:text-white pt-4 space-y-2">
                <span className="text-black dark:bg-slate-900 dark:text-white">
                  Email
                </span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="dark:bg-slate-900 dark:text-white w-80 px-3 py-1 border rounded-md outline-none text-black"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500">Email is required</p>
                )}
              </div>
              <div className="dark:bg-slate-900 dark:text-white pt-4 space-y-2">
                <span className="text-black dark:bg-slate-900 dark:text-white">
                  Password
                </span>
                <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="dark:bg-slate-900 dark:text-white w-80 px-3 py-1 border rounded-md outline-none text-black"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500">Password is required</p>
                )}
              </div>
              <div className="flex justify-around pt-4 text-black dark:bg-slate-900 dark:text-white">
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-700 duration-200 text-white px-3 py-1 rounded-md"
                >
                  Login
                </button>
                <p>
                  New user!
                  <span className="underline p-2 text-blue-500">
                    <Link to="/signup">Sign up</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default Login;
