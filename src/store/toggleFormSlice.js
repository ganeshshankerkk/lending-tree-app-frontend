import { createSlice } from "@reduxjs/toolkit";

const initialFormState = { userRegistration : true, userLogin : true};

const toggleFormState = createSlice({
    name: "toggle",
    initialState: initialFormState,
    reducers:{
        toggleUserRegistrationForm(state){
            state.userRegistration = true
        },
        toggleAgentRegistrationForm(state){
            state.userRegistration = false
        },
        toggleUserLogin(state){
            state.userLogin = true
        },
        toggleAgentLogin(state){
            state.userLogin = false
        }
    } 
})

export const toggleFormActions = toggleFormState.actions;
export default toggleFormState.reducer;