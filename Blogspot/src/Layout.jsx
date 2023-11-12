import React from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./Context/Theme";

export default function Layout() {
  const [mode, setMode] = React.useState("light");
  const darkTheme = () => {
    setMode("dark");
  };

  const lightTheme = () => {
    setMode("light");
  };
  React.useEffect(()=>{
    document.querySelector('html').classList.remove("dark","light");
    document.querySelector('html').classList.add(mode);
},[mode])
  return (
    <>
      <ThemeProvider value={{mode,lightTheme,darkTheme}}>
        <Header />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  );
}
