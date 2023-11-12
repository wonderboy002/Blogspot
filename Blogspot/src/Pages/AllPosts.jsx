import React, { useState, useEffect } from "react";
import  dbService from "../Appwrite/Configuration";
import PostCard from "../Components/Postcard";
import Container from "../Container/Container";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  },[]);

  useEffect(()=>{
    console.log("these are posts",posts);
  })

  return (
    <div className="w-full dark:bg-indigo-950 p-8">
        <div className="flex  flex-wrap gap-4">
          {posts.map((post) => {
            return (
              <div key={post.$userid} className="p-3">
                <PostCard {...post} />
              </div>
            );
          })}
        </div>
    </div>
  );
}

export default AllPosts;
