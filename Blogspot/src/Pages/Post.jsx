import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../Appwrite/Configuration";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Container from "../Container/Container";
import "../index.css"

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;
    useEffect(()=>{
        console.log("This is post",post);
        console.log("this is userData",userData);
        console.log(isAuthor);
    })

    useEffect(() => {
        if (slug) {
            dbService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        dbService.deleteDocument(post.$id).then((status) => {
            if (status) {
                dbService.deletefile(post.image);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex flex-col items-center justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={dbService.getFilePreview(post.image)}
                        alt={post.title}
                        className="rounded-xl w-[600px] h-[600px]"
                    />

                    {isAuthor && (
                        <div className="flex gap-4 mt-8">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button  className="hover:scale-125 bg-green-500 p-2 text-white font-semibold">
                                    Edit
                                </button>
                            </Link>
                            <button className="hover:scale-125 bg-red-500 p-2 font-semibold text-white" onClick={deletePost}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.Realcontent)}
                    </div>
            </Container>
        </div>
        // <h1>hello</h1>
    ) : null;
}