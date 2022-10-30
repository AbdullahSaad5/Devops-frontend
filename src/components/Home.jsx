import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login", {
      state: {
        message: "You have been logged out successfully",
      },
    });
  };

  return (
    <>
      <h1 className="text-3xl">
        Welcome to The Website,{" "}
        <span className="font-bold">{location.state.data.user.name}!</span>
      </h1>
      <button
        onClick={handleClick}
        className="bg-red-500 text-white px-3 py-2 rounded-md block mt-4"
      >
        Logout
      </button>
    </>
  );
}
