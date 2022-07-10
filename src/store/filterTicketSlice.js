import { createSlice } from "@reduxjs/toolkit";

const filteredTicketState = {
    filteredTicketByUserId: [{
    }]
}
const filterTicketSlice = createSlice({
    name: 'filterTicket',
    initialState: filteredTicketState,
    reducers: {
        individualTicketRecords(state, action) {
            state.filteredTicketByUserId = action.payload.filteredTicketData;
        }
    }
})

export const filterTicketActions = filterTicketSlice.actions;
export default filterTicketSlice.reducer;