import React from "react";
import { useState, useEffect } from "react";
import dbService from "../Appwrite/Configuration";
import Postcard from "../Components/Postcard";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.logged);

  useEffect(() => {
    dbService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (authStatus === false) {
    return (
      <div className="flex p-7 flex-col items-center mt-8 gap-4">
        <h1 className="text-4xl home-title font-extrabold">Login To read Posts or why don't You write some yourself</h1>
        <img
          src="https://cdn-icons-gif.flaticon.com/10971/10971307.gif"
          className="h-[500px]"
          alt="img-error"
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => {
          return (
            <div key={post.$id} className="p-3">
              <Postcard {...post} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
