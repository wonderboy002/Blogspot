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
    <div>
      <Container>
        <div className="flex flex-wrap gap-4">
          {posts.map((post) => {
            return (
              <div key={post.$userid} className="p-3">
                <PostCard {...post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
