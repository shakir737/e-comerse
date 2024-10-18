import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: null,

}
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        userList: (state, action) => {
            state.users = action.payload;
        },
       
    }
})

export const { userList} = userSlice.actions;
export default userSlice.reducer;