import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin, login } from "../Store/authSlice";
import Auth from "../Appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import "../index.css";
import usetheme from "../Context/Theme";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { mode } = usetheme();

  const signUp = async (data) => {
    setError("");
    try {
      const userData = await Auth.createAccount(data);
      if (userData) {
        const userData = await Auth.getAccount();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="mainlogin w-full dark:bg-indigo-950  flex flex-col gap-4 items-center p-12">
      <h1 className="text-xl dark:text-white font-xl font-semibold">
        Create your Account
      </h1>
      {error && (
        <p className="text-red-500 font-semibold text-center">
          {JSON.stringify(error.response)}
        </p>
      )}
      <form
        onSubmit={handleSubmit(signUp)}
        className="flex w-full items-center flex-col gap-4"
      >
        <TextField
          label="Enter Your Name"
          type="text"
          className="w-full md:w-1/3"
          InputProps={{
            autoComplete: "off",

            style: {
              color: mode === "dark" ? "white" : "black",
              // border : mode==="dark" ? "1px solid white":"none",
              borderTop: "none",
              autoComplete: "off",
            },
          }}
          InputLabelProps={{
            style: {
              color: mode === "dark" ? "white" : "",
            },
          }}
          {...register("name", {
            required: true,
          })}
        />
        <TextField
          id="outlined-password-input"
          label="Enter Your Email"
          type="email"
          className="w-full md:w-1/3"
          InputProps={{
            autoComplete: "off",
            style: {
              color: mode === "dark" ? "white" : "black",
              // border : mode==="dark" ? "1px solid white":"none",
              borderTop: "none",
             
            },
          }}
          InputLabelProps={{
            style: {
              color: mode === "dark" ? "white" : "",
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
          InputProps={{
            autoComplete: "off",

            style: {
              color: mode === "dark" ? "white" : "black",
              // border : mode==="dark" ? "1px solid white":"none",
              borderTop: "none",
              borderColor: "red",
            },
          }}
          InputLabelProps={{
            style: {
              color: mode === "dark" ? "white" : "",
            },
          }}
          className="w-full md:w-1/3"
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
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
