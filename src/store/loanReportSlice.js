import { createSlice } from "@reduxjs/toolkit";

const loanReportData = {
    filterLoanReport: [{
    }]
}

const loanReportSlice = createSlice({
    name: 'filterLoanRecords',
    initialState:  loanReportData,
    reducers: {
        filterLoanReport(state, action) {
            state.filterLoanReport = action.payload.filteredLoanData;
        }
    }
})

export const loanReportActions = loanReportSlice.actions;
export default loanReportSlice.reducer;