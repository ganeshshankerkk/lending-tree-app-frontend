import { createSlice } from "@reduxjs/toolkit";

const rejectedLoanData = {
    filterRejectedLoan: [{
    }]
}

const rejectedLoanSlice = createSlice({
    name: 'filterLoanRecords',
    initialState:  rejectedLoanData,
    reducers: {
        individualRejectedLoanRecords(state, action) {
            state.filterRejectedLoan = action.payload.filteredLoanData;
        }
    }
})

export const rejectedLoanActions = rejectedLoanSlice.actions;
export default rejectedLoanSlice.reducer;