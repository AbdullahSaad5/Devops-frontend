import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:3000/users/login", data);
      console.log(res);
      if (!res.data.success) {
        alert("Invalid credentials");
        return;
      }
      localStorage.setItem("token", res.data.token);
      navigate("/home", {
        state: {
          data: res.data,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center bg-white p-10 rounded-3xl"
    >
      <h1 className="text-4xl font-semibold mb-3">User Login</h1>
      {location.state?.message && (
        <p className="text-md font-medium mb-6 text-green-500">
          {location.state.message}
        </p>
      )}
      <p className="text-md font-medium mb-6">
        Hey, Enter your details to get sign in to your account
      </p>
      <input
        type="text"
        placeholder="Email"
        className="w-full mb-4 border px-3 py-2 rounded-md"
        {...register("email", {
          required: true,
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border px-3 py-2 rounded-md"
        {...register("password", {
          required: true,
          //   minLength: 6,
          maxLength: 20,
        })}
      />

      {errors && (
        <div className="my-4">
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-red-500 text-sm">Email pattern is invalid</p>
          )}
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">
              Password must be at least 6 characters
            </p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-red-500 text-sm">
              Password must be at most 20 characters
            </p>
          )}
        </div>
      )}

      <button className="bg-[#fdc886] w-full text-black font-semibold px-6 py-3 rounded-md my-4">
        Login
      </button>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className=" font-semibold">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
