import React, { useEffect, useState } from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import HamMenu from "../HamMenu";
import Drawer from "@mui/material/Drawer";

function Header() {
  const authStatus = useSelector((state) => state.auth.logged);
  const [menuToggle, setmenuToggle] = useState(false);
  useEffect(() => {
    console.log("this is auth Status", authStatus);
  });
  const navigate = useNavigate();
  useEffect(() => {
    console.log(navItems.filter((item) => item.active));
    console.log("hey i am menu toggle ", menuToggle);
  });
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/Login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/Signup",
      active: !authStatus,
    },
    {
      name: "AllPosts",
      url: "/AllPosts",
      active: authStatus,
    },
    {
      name: "AddPost",
      url: "/AddPostPage",
      active: authStatus,
    },
  ];
  return (
    <div>
      <header className="shadow-md mb-4 w-full shadow-slate-200">
        <Container>
          <nav className="navitems w-full flex gap-4 items-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/007/728/084/non_2x/inspirational-handwritten-brush-lettering-blog-calligraphy-illustration-isolated-on-white-background-typography-for-banners-badges-postcard-tshirt-prints-posters-vector.jpg"
              className="logo w-[100px] h-[65px]"
              alt=""
            />
            <div className="md:flex md:items-center hidden ml-auto gap-4">
              {navItems.map((item) =>
                item.active ? (
                  <div key={item.name}>
                    <Link
                      to={item.url}
                      className="text-black font-bold duration-300 hover:bg-emerald-400 p-3 hover:rounded-full"
                    >
                      {item.name}
                    </Link>
                  </div>
                ) : null
              )}

              <ThemeSwitch />
              {authStatus && <LogoutBtn />}
            </div>
            <button
              onClick={() => setmenuToggle(!menuToggle)}
              className="hamburger-menu ml-auto shadow-md shadow-slate-400 p-2 rounded-full md:hidden block"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
            {menuToggle && (
              <Drawer anchor="top" open={menuToggle} onClose={setmenuToggle}>
                {/* Content of the drawer goes here */}
                <div
                  className="Links p-5 flex items-center flex-col gap-4"
                  onClick={() => setmenuToggle(false)}
                >
                  <button className="Close mx-auto shadow-lg w-[30px] shadow-slate-400 rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  {navItems.map((item) =>
                    item.active ? (
                      <div key={item.name}>
                        <Link
                          to={item.url}
                          className="text-black font-bold duration-300 hover:bg-emerald-400 p-3 hover:rounded-full"
                        >
                          {item.name}
                        </Link>
                      </div>
                    ) : null
                  )}
                  <div className="mx-auto">{authStatus && <LogoutBtn />}</div>
                </div>
              </Drawer>
            )}
          </nav>
        </Container>
      </header>
    </div>
  );
}

export default Header;
