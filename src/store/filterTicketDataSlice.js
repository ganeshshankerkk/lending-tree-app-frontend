import { createSlice } from "@reduxjs/toolkit";

const filterTicketRecords = {
    filteredTicketDetails: [{
    }]
}

const filterTicketData = createSlice({
    name: 'filterTicketRecords',
    initialState: filterTicketRecords,
    reducers: {
        individualTicketRecords(state, action) {
            state.filteredTicketDetails = action.payload.filterTicketData;
        }
    }
})

export const filterTicketDataActions = filterTicketData.actions;
export default filterTicketData.reducer;