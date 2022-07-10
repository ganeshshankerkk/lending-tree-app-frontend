import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
    isLoggedIn : false, 
    isAgencyLogggedIn : false,
    loggedUserRecords : {},
    loggedAgentRecord : {},
    agentLoggedInProfile : false,
    isAdminLoggedIn:false,
    pickUpAgentLoggedIn: false,
    personVerificationAgentLoggedIn:false,
    isLegalAgentLoggedIn : false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialLoginState,
    reducers: {
        loggedInState(state){
            state.isLoggedIn = true;
        },
        logoutSate(state){
            state.isLoggedIn = false;
        },
        persistUserRecords(state, action){
            state.loggedUserRecords = action.payload.givenLoginData;
        },
        approvalAgencyLoggedIn(state){
            state.isAgencyLogggedIn = true;
        },
        approvalAgencyLoggedOut(state){
            state.isAgencyLogggedIn = false;
        },
        agentLoggedInProfile(state){ //to display dynamically populated profile page for all logged in agents
            state.agentLoggedInProfile =true;
        },
        agentLoggedOutProfile(state){ //to display dynamically populated profile page for all logged in agents
            state.agentLoggedInProfile =false;
        },
        persistAgentsRecord(state, action){
            state.loggedAgentRecord  = action.payload.givenLoginData;
        },
        agencyAdminLoggedInState(state){
            state.isAdminLoggedIn = true;
        },
        agencyAdminLoggedOutState(state){
            state.isAdminLoggedIn =false;
        },
        pickUpLoggedIn(state){
            state.pickUpAgentLoggedIn = true;
        },
        pickupLoggedOut(state){
            state.pickUpAgentLoggedIn =false;
        },
        personVerificationDepartmentLoggedIn(state){
            state.personVerificationAgentLoggedIn = true;
        },
        personVerificationDepartmentLoggedOut(state){
            state.personVerificationAgentLoggedIn = false;
        },
        legalAgentLoggedIn(state){
            state.isLegalAgentLoggedIn= true;
        },
        legalAgentLoggedOut(state){
            state.isLegalAgentLoggedIn = false;
        }
    }
})

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;