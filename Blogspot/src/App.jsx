import { useEffect, useState } from "react";
import conf from "./conf/conf";
import { useDispatch } from "react-redux";
import Auth from "./Appwrite/auth";
import { login, logout } from "./Store/authSlice";
import { Footer, Header } from "./Components";
import Input from "./Components/Input";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import RTE from "./Components/RTE";
import AddPostPage from "./Pages/AddPostPage";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.getAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {!loading ? (
        <div className="min-h-screen flex flex-col gap-6">
          <div className="main w-full block">
            <Header />
            <SignupPage/>
            <Footer />
           
          </div>
         
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
}

export default App;
