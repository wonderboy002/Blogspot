import {useContext,createContext} from "react";
export const themeContext=createContext({
    mode : "light",
    darkTheme : ()=>{console.log("dark mode enabled");},
    lightTheme : ()=>{console.log("light mode enabled");}
})

export const ThemeProvider=themeContext.Provider;
export default function usetheme(){
    return useContext(themeContext);
}