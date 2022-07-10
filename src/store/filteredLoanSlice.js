import { createSlice } from "@reduxjs/toolkit";

const filteredLoanState = {
    filteredLoanDataById: [{
    }]
}

const filteredLoanSlice = createSlice({
    name: 'filterLoanRecord',
    initialState: filteredLoanState,
    reducers: {
        individualLoanRecords(state, action) {
            state.filteredLoanDataById = action.payload.filteredLoanData;
        }
    }
})

export const filterLoanActions = filteredLoanSlice.actions;
export default filteredLoanSlice.reducer;