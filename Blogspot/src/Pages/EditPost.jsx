import React from 'react';
import { useState,useEffect } from 'react';
import dbService from "../Appwrite/Configuration"
import PostForm from "../Components/PostForm/PostForm"
import {useParams,useNavigate, Navigate} from "react-router-dom";

function EditPost() {
    const [post,setPost]=useState(null);
    // const {slug}=useParams();
    // const navigate=useNavigate();
    useEffect(()=>{ 
        if (slug){
            dbService.getPost(slug)
            .then((post)=>{
                if (post){
                    setPost(post)
                }
            })
        }
        else {
            // navigate("/");
        }

    },[])
  return post? (<div>
    <PostForm/>
  </div>) :null; 
}

export default EditPost;
