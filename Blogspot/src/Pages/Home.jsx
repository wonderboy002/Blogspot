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
      <div className="md:flex dark:bg-indigo-950 p-28 md:flex-col md:items-center  gap-4">
        <h1 className="md:text-4xl text-xl mb-8 dark:text-white home-title font-extrabold">Login To read Posts or why don't You write some yourself</h1>
        <img
          src="https://cdn-icons-gif.flaticon.com/10971/10971307.gif"
          className="h-[500px] md:rounded-full"
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
