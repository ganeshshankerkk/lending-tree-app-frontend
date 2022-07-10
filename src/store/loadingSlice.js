import { createSlice } from "@reduxjs/toolkit";

const initiaLoadingState = {isLoading : false}

const loadingSlice = createSlice({
    name: 'loading',
    initialState: initiaLoadingState,
    reducers: {
        dataIsLoading(state){
            state.isLoading = true;
        },
        dataLoaded(state){
            state.isLoading = false;
        }
    }
})

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;