import { createSlice } from "@reduxjs/toolkit";

const initialRegistrationState = { registrationData : {}};

const registrationSlice = createSlice({
    name: 'registration',
    initialState: initialRegistrationState,
    reducers:{
        userRegData(state, action){
            state.registrationData = action.payload.postUserRecords;
            console.log(state.registrationData);
        }
    }
})

export const registrationActions = registrationSlice.actions;
export default registrationSlice.reducer;