import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from './registrationSlice'
import toggleRegistrationReducer from './toggleFormSlice'
import loginReducer from './loginSlice';
import adminloginReducer from './adminloginSlice'
import filteredLoanReducer from './filteredLoanSlice';
import filterTicketReducer from './filterTicketSlice';
import filterApprovalAgencyApprovedLoanReducer from './filterApprovalAgencyApprovedLoanSlice'
import loadingReducer from './loadingSlice';
import filterTicketDataReducer from './filterTicketDataSlice'
import rejectedLoanReducer from './rejectedLoanSlice'
import filterFeedbackReducer from './filterFeedbackSlice'
import adminFeedbackReducer from './adminFeedbackSlice'
import loanReportReducer from './loanReportSlice'
const store = configureStore({
    reducer: {
        userRegistration : registrationReducer,
        toggleRegistrationForm : toggleRegistrationReducer,
        loginState : loginReducer,
        filterLoan : filteredLoanReducer,
        filterAppAgencyLoan : filterApprovalAgencyApprovedLoanReducer,
        loadingState : loadingReducer,
        filterTicket : filterTicketReducer,
        adminLoginState : adminloginReducer,
        filterTicketData : filterTicketDataReducer,
        filterRejectedLoans : rejectedLoanReducer,
        filterFeedback : filterFeedbackReducer,
        filterAllFeedbackAdmin : adminFeedbackReducer,
        loanReport : loanReportReducer
    }
})

export default store;