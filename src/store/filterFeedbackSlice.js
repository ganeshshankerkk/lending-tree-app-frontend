import { createSlice } from "@reduxjs/toolkit";

const filterFeedbackSlice = {
    filteredFeedback: [{
    }]
}

const filterFeedback = createSlice({
    name: 'filterPendingFeedback',
    initialState: filterFeedbackSlice,
    reducers: {
        pendingFeedbackLoans(state, action) {
            state.filteredFeedback = action.payload.pendingFeedbackSurvey ;
      
        }
    }
})

export const filterFeedbackActions = filterFeedback.actions;
export default filterFeedback.reducer;