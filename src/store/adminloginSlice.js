import { createSlice } from "@reduxjs/toolkit";

const initialAdminLoginState = {
    isLendingTreeAdminLoggedIn: false,
}

const adminloginSlice = createSlice({
    name: 'adminlogin',
    initialState: initialAdminLoginState,
    reducers: {
        lendingTreeAdminLoggedIn(state){
            state.isLendingTreeAdminLoggedIn = true;
        },
        lendingTreeAdminLoggedOut(state){
            state.isLendingTreeAdminLoggedIn =false;
        }
    }
})
export const adminLoginActions = adminloginSlice.actions;
export default adminloginSlice.reducer;