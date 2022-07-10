import { createSlice } from "@reduxjs/toolkit";

const filterLoanData = {
    filteredLoanDataById: [{
    }]
}

const  filterApprovalAgencyApprovedLoan = createSlice({
    name: 'filterLoanRecords',
    initialState: filterLoanData,
    reducers: {
        individualLoanRecord(state, action) {
            state.filteredLoanDataById = action.payload.filteredLoanData;
        }
    }
})
export const filterAppAgencyLoanActions =  filterApprovalAgencyApprovedLoan.actions;
export default  filterApprovalAgencyApprovedLoan.reducer;