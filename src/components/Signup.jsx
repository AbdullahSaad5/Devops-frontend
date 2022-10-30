import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

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
      const res = await axios.post("http://54.248.31.108:3000/users/signup", data);
      console.log(res);
      if (!res.data.success) {
        alert("Make sure you fill all the fields");
        return;
      }
      localStorage.setItem("token", res.data.token);
      navigate("/login", {
        state: {
          message: "User created successfully",
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
      <h1 className="text-4xl font-semibold mb-3">User Sign Up</h1>
      <p className="text-md font-medium mb-6">
        Hey, Enter your details to get sign up for a new account
      </p>
      <input
        type="text"
        placeholder="Full Name"
        className="w-full mb-4 border px-3 py-2 rounded-md"
        {...register("name", {
          required: true,
        })}
      />
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
          {errors.name?.type === "required" && (
            <p className="text-red-500 text-sm">Full Name is required</p>
          )}
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
        Sign Up
      </button>
      <p>
        Already have an account?{" "}
        <Link to="/login" className=" font-semibold">
          login In
        </Link>
      </p>
    </form>
  );
}
