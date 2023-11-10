import {createSlice} from "@reduxjs/toolkit";
//postSlice bhi banane ka hai
const initialState={
    logged : false,
    userData : null
}

const authSlice=createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state,action)=>{
            state.logged=true;
            state.userData=action.payload;
        },
        logout : (state)=>{
            state.logged=false;
            state.userData=null;
        }
    }
})

export default authSlice.reducer;
export const {login,logout} =authSlice.actions;
