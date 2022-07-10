import { createSlice } from "@reduxjs/toolkit";

const filterFeedback = {
    filteredFeedback: [{
    }]
}

const adminFeedbackSlice = createSlice({
    name: 'feedbacks',
    initialState: filterFeedback,
    reducers: {
        allFeedbacks(state, action) {
            state.filteredFeedback = action.payload.filteredFeedbackRecords ;
      
        }
    }
})

export const feedbackActions = adminFeedbackSlice.actions;
export default adminFeedbackSlice.reducer;