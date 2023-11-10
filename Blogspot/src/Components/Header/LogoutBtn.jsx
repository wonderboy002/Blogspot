import React from 'react';
import {useDispatch} from "react-redux";
import Auth from "../../Appwrite/auth";
import {logout} from "../../Store/authSlice";
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logoutHandler=()=>{
        Auth.logout().then(()=>{
            dispatch(logout());
        })
        .catch(error=>{
            console.log("Error logging out :: LogoutBtn.jsx");
        })
        navigate("/");
    }
  return (
      <button className='p-3 bg-red-500 ml-auto text-white font-bold rounded-md duration-200 hover:bg-red-400 ' onClick={logoutHandler}>Logout</button>
  
  );
}

export default LogoutBtn;
