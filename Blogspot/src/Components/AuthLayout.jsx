import React,{useState,useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function AuthLayout({children,authentication=true}) {
    const navigate=useNavigate() 
    const [loading,setLoading]=useState(true)
    const authStatus=useSelector(state=>state.logged)

    useEffect(()=>{
        //yeh wala routing k baad ache se smjh aa jayega
        //else easy karne k liye we can check only authStatus
         if (authentication && authStatus!==authentication){
               navigate("/login");
         }
         else if (authentication && authStatus!==authentication){
            navigate("/")
         }
         setLoading(false);
    },[authStatus,authentication])//navigate add karna hai
  return (
     loading?<h1>Loading....</h1>:<>{children}</>
  );
}
