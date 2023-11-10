import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Store/Store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Components/AuthLayout.jsx";
import Signup from "./Components/Signup.jsx";
import AllPosts from "./Pages/AllPosts.jsx";
import AddPostPage from "./Pages/AddPostPage.jsx";
import EditPost from "./Pages/EditPost.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import Post from "./Pages/Post.jsx";
import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
         path : "/",
         element : <Home/>
      },
      {
        path: "/Login",
        element: <LoginPage />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path: "/AllPosts",
        element: <AllPosts />,
      },
      {
        path: "/AddPostPage",
        element: <AddPostPage />,
      },
      {
        path: "/EditPost/:slug",
        element: (
         
            <EditPost />
     
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
