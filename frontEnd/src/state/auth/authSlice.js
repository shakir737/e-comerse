import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,

}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        userRegistration: (state, action) => {
            state.token = action.payload;
        },
        userLoggedIn : (state, action) => {
            
            state.token = action.payload;
            
        },
        userLoggedOut : (state, action) => {
            state.token = null;
            
        }
    }
})

export const {userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;