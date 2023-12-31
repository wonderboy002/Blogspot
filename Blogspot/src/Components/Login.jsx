import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../Store/authSlice";
import Input from "./Input";
import Auth from "../Appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import "../index.css";
import usetheme from "../Context/Theme";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { mode } = usetheme();

  useEffect(() => {
    console.log("hey i am here", mode);
  });

  const login = async (data) => {
    setError("");
    try {
      const session = await Auth.login(data);
      if (session) {
        const userData = await Auth.getAccount();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/AllPosts");
        }
      }
    } catch (error) {
      setError(error);
      console.log("error in Login.jsx Component", error);
    }
  };
  return (
    <div className="mainlogin w-full dark:bg-indigo-950 flex flex-col gap-4 p-20  items-center">
      <h1 className="text-xl dark:text-white font-xl font-semibold">
        Login in to your Account
      </h1>
      <p className="font-bold dark:text-white">
        Don't have an account ??{" "}
        <Link
          to="/Signup"
          className="font-bold p-1 rounded-full underline dark:text-white text-blue-700  hover:text--blue-400"
        >
          Sign up Here
        </Link>
      </p>
      {error && (
        <p className="text-red-500 font-semibold text-center">
          {error.response.message}
        </p>
      )}
      <form
        onSubmit={handleSubmit(login)}
        className="flex w-full items-center flex-col gap-4"
      >
        <TextField
          id="outlined-password-input"
          label="Enter Your Email"
          type="email"
          className="w-full p-3 md:w-1/3 text-red-500"
          InputProps={{
            autoComplete: "off",

            style: {
              color: mode==="dark" ? "white" : "black",
              // border : mode==="dark" ? "1px solid white":"none",
              borderTop : "none"
            },
          }}
          InputLabelProps={{
            style: {
              color: mode==="dark" ? 'white' : '',
            },
          }}
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                  value
                ) || "Enter a valid email address",
            },
          })}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          className="w-full md:w-1/3"
          InputProps={{
            autoComplete: "off",

            style: {
              color: mode==="dark" ? "white" : "black",
            },
          }}
          InputLabelProps={{
            style: {
              color: mode==="dark" ? 'white' : '',
            },
          }}
          {...register("password", {
            required: true,
            // validate : (value) =>  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value) ||
            // "enter a valid password" baad mein dekhte
          })}
        />
        <button
          type="submit"
          className="bg-emerald-600 p-3 loginbtn w-full md:w-1/3 text-white font-semibold "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
