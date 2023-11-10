import React from 'react';
import dbService from '../Appwrite/Configuration';
import {Link} from "react-router-dom";
function Postcard(post) {
  return (
    <Link to={`/post/${post.$id}`}>
      <div className='w-full shadow-md h-[400px] shadow-slate-400 flex flex-col gap-5 items-center roundex-xl p-4'>
         <div className="image">
             <img src={dbService.getFilePreview(post.image)} alt={post.title}
             className='h-[300px] w-[300px]' />
         </div>
         <h1>{post.title}</h1>
      </div>
    </Link>
  );
}

export default Postcard;
