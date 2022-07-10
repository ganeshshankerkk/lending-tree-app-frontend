import { Fragment } from "react";
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../../pages/HomePage';
import Login from '../../pages/Login';
import Registration from '../../pages/Registration';
import UnAuthorized from '../../pages/UnAuthorized';
import UserProfile from '../../components/userProfile/UserProfile'
import SupportTicket from '../../components/userProfile/SupportTicket'
import SupportTicketStatus from '../../components/userProfile/SupportTicketStatus'
import TrackingDetails from '../../components/userProfile/TrackingDetails'
import TrackApplicationStatus from '../../components/userProfile/TrackApplicationStatus'
import IndividualTicketStatus from '../../components/userProfile/IndividualTicketStatus'
import UserRecords from '../../components/userProfile/UserRecords'
import AdminLogin from '../../components/login/AdminLogin'
import LoanApplicationForm from '../../components/loanapplication/LoanApplicationForm'
import AllAgentRecords from '../../components/allagentprofile/AllAgentRecords'
import ViewAllPendingLoan from '../../components/approvalAgencyProfile/ViewAllPendingLoan'
import FilteredPendingLoan from '../../components/approvalAgencyProfile/FilteredPendingLoan'
import ApprovalAgencyProfile from '../../components/approvalAgencyProfile/ApprovalAgencyProfile'
import AdminProfile from '../../components/adminprofile/agencyAdminProfile/AdminProfile'
import FeedbackSurvey from '../../components/adminprofile/feedback/FeedbackSurvey';
import AllPendingFeedback from '../../components/adminprofile/feedback/AllPendingFeedback';
import ViewAllFeedbackAdmin from '../../components/adminprofile/feedback/ViewAllFeedbackAdmin';
import IndividualFeedbackDetails from '../../components/adminprofile/feedback/IndividualFeedbackDetails';
import ViewAllPendingLoanAdmin from '../../components/adminprofile/pendingAdminApproval/ViewAllPendingLoanAdmin'
import FilterAdminApproval from '../../components/adminprofile/pendingAdminApproval/FilterAdminApproval'
import PendingLoanAdminToVerification from '../../components/adminprofile/routeAdminToVerificationDept/PendingLoanAdminToVerification'
import IndividualLoanApplicationRecords from '../../components/adminprofile/routeAdminToVerificationDept/IndividualLoanApplicationRecords'
import ViewAllRejectedLoans from '../../components/adminprofile/rejectedLoans/ViewAllRejectedLoans'
import PendingLoanAdminToLegalVerification from '../../components/adminprofile/routeAdminToLegalVerficationDept/PendingLoanAdminToLegalVerification'
import IndividualRecordsPendingAdminApproval from '../../components/adminprofile/routeAdminToLegalVerficationDept/IndividualRecordsPendingAdminApproval'
import PickUpAgentProfile from '../../components/pickupagentprofile/PickUpAgentProfile'
import FilteredPickUpRequest from '../../components/pickupagentprofile/FilteredPickUpRequest'
import ViewAllPendingPickUp from '../../components/pickupagentprofile/ViewAllPendingPickUp'
import VerificationDepartmentProfile from '../../components/verificationDepartmentProfile/VerificationDepartmentProfile'
import AllPendingVerificationAgent from '../../components/verificationDepartmentProfile/AllPendingVerificationAgent'
import FilteredPersonVerificationRequest from '../../components/verificationDepartmentProfile/FilteredPersonVerificationRequests'
import LegalVerificationAgentProfile from '../../components/legalVerificationAgentProfile/LegalVerificationAgentProfile'
import AllPendingLegalVerification from '../../components/legalVerificationAgentProfile/AllPendingLegalVerification'
import FilteredPendingLegalVerificationRequest from '../../components/legalVerificationAgentProfile/FilteredPendingLegalVerificationRequest'
import LegallyVerifiedLoans from '../../components/adminprofile/legallyVerifiedLoans/LegallyVerifiedLoans'
import IndividualVerifiedLoanRecords from '../../components/adminprofile/legallyVerifiedLoans/IndividualVerifiedLoanRecords'
import LendingTreeAdminProfile from '../../components/lendingTreeAdmin/LendingTreeAdminProfile'
import AllPendingTickets from '../../components/lendingTreeAdmin/pendingTicketDetails/AllPendingTickets'
import IndivialTicketDetails from '../../components/lendingTreeAdmin/pendingTicketDetails/IndivialTicketDetails'
import AllResolvedTickets from '../../components/lendingTreeAdmin/approvedTickets/AllResolvedTickets'
import InidiviualResolvedTickets from '../../components/lendingTreeAdmin/approvedTickets/InidiviualResolvedTickets'
import UserForgotPassword from "../login/UserForgotPassword";
import AgentForgotPassword from "../login/AgentForgotPassword";
import UserForgotId from "../login/UserForgotId";
import AgentForgotId from "../login/AgentForgotId";
import Contact from "../../pages/Contact";
import IndividualRejectedLoan from "../adminprofile/rejectedLoans/IndividualRejectedLoan";
import Reports from "../lendingTreeAdmin/reports/Reports";
import AllRejectedLoans from "../lendingTreeAdmin/reports/AllRejectedLoans";
import ViewIndividualRejectedLoan from "../lendingTreeAdmin/reports/ViewIndividualRejectedLoan";
import NewLoans from "../lendingTreeAdmin/reports/NewLoans";
import FilterNewLoan from "../lendingTreeAdmin/reports/FilterNewLoan";
import ApprovedLoan from "../lendingTreeAdmin/reports/ApprovedLoan";
import FilterApprovedLoan from "../lendingTreeAdmin/reports/FilterApprovedLoan";

function RoutePageNavigation() {
    const userLoginHandler = useSelector(state => state.loginState.isLoggedIn);
    const approvalAgencyLoginHandler = useSelector(state => state.loginState.isAgencyLogggedIn);
    const agentLoginDynamicProfile = useSelector(state => state.loginState.agentLoggedInProfile);
    const agencyAdminLoginHandler = useSelector(state => state.loginState.isAdminLoggedIn);
    const pickUpAgentLoggedInHandler = useSelector(state => state.loginState.pickUpAgentLoggedIn);
    const personVerificationAgentLoggedInHandler = useSelector(state => state.loginState.personVerificationAgentLoggedIn);
    const legalAgentLoggedInHandler = useSelector(state => state.loginState.isLegalAgentLoggedIn);
    const lendingTreeAdminLogInHandler = useSelector(state => state.adminLoginState.isLendingTreeAdminLoggedIn);
    return (
        
        <Fragment>
            <Switch>
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <Route path="/register">
                    <Registration />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                {/* User Profile */}
                {userLoginHandler && <Route path="/dashboard" exact>
                    <UserProfile />
                </Route>}
                {userLoginHandler && <Route path="/profile">
                    <UserRecords />
                </Route>}
                {userLoginHandler && <Route path="/apply-loan" exact>
                    <LoanApplicationForm />
                </Route>}
                {userLoginHandler && <Route path="/tracking" exact>
                    <TrackApplicationStatus />
                </Route>}
                {userLoginHandler && <Route path="/tracking/:userid" exact>
                    <TrackingDetails />
                </Route>}
                {userLoginHandler && <Route path="/ticket" exact>
                    <SupportTicket />
                </Route>}
                {userLoginHandler && <Route path="/ticket/status" exact>
                    <SupportTicketStatus />
                </Route>}
                {userLoginHandler && <Route path="/ticket/status/:ticketid" exact>
                    <IndividualTicketStatus />
                </Route>}
                {userLoginHandler && <Route path="/pending-feedback" exact>
                    <AllPendingFeedback />
                </Route>}
                {userLoginHandler && <Route path="/pending-feedback/:loanId" exact>
                    <FeedbackSurvey />
                </Route>}
                {/* Agent Dynamic Profile */}
                {agentLoginDynamicProfile && <Route path="/profile" exact>
                    <AllAgentRecords />
                </Route>}
                {/* Approval Agency Profile */}
                {approvalAgencyLoginHandler && <Route path="/dashboard" exact>
                    <ApprovalAgencyProfile />
                </Route>}
                {approvalAgencyLoginHandler && <Route path="/pendingloan" exact>
                    <ViewAllPendingLoan />
                </Route>}
                {approvalAgencyLoginHandler && <Route path="/pendingloan/:loanId" exact>
                    <FilteredPendingLoan />
                </Route>}
                {/* Agency Admin Profile */}
                {agencyAdminLoginHandler &&
                    <Route path="/dashboard" exact>
                        <AdminProfile />
                    </Route>}
                {agencyAdminLoginHandler && <Route path="/pending-loan" exact>
                    <ViewAllPendingLoanAdmin />
                </Route>}
                {agencyAdminLoginHandler && <Route path="/pending-loan/:loanId" exact>
                    <FilterAdminApproval />
                </Route>}
                {agencyAdminLoginHandler && <Route path="/pending-verification" exact>
                    <PendingLoanAdminToVerification />
                </Route>}
                {agencyAdminLoginHandler && <Route path="/pending-verification/:loanId" exact>
                    <IndividualLoanApplicationRecords />
                </Route>}
                {agencyAdminLoginHandler && <Route path="/legal-verification" exact>
                    <PendingLoanAdminToLegalVerification />
                </Route>}
                {agencyAdminLoginHandler && <Route path="/legal-verification/:loanId" exact>
                    <IndividualRecordsPendingAdminApproval />
                </Route>}
                {agencyAdminLoginHandler && <Route path="/loans/approved" exact>
                    <LegallyVerifiedLoans />
                </Route>}
                {agencyAdminLoginHandler && <Route path="/loans/approved/:loanId" exact>
                    <IndividualVerifiedLoanRecords />
                </Route>}
                {agencyAdminLoginHandler && <Route path="/loans/rejected/" exact>
                    <ViewAllRejectedLoans />
                </Route>}
                {agencyAdminLoginHandler && <Route path="/loans/rejected/:loanid" exact>
                    <IndividualRejectedLoan />
                </Route>}
                <Route path="/login/admin">
                    <AdminLogin />
                </Route>
                {/* Pick up agent profile */}
                {pickUpAgentLoggedInHandler && <Route path="/dashboard">
                    <PickUpAgentProfile />
                </Route>}
                {pickUpAgentLoggedInHandler && <Route path="/pickup/pending" exact>
                    <ViewAllPendingPickUp />
                </Route>}
                {pickUpAgentLoggedInHandler && <Route path="/pickup/pending/:loanId">
                    <FilteredPickUpRequest />
                </Route>}
                {/* person verification agent profile */}
                {personVerificationAgentLoggedInHandler && <Route path="/dashboard">
                    <VerificationDepartmentProfile />
                </Route>}
                {personVerificationAgentLoggedInHandler && <Route path="/verification/pending" exact>
                    <AllPendingVerificationAgent />
                </Route>}
                {personVerificationAgentLoggedInHandler && <Route path="/verification/pending/:loanId">
                    <FilteredPersonVerificationRequest />
                </Route>}
                {/* legal verification agent profile */}
                {legalAgentLoggedInHandler && <Route path="/dashboard">
                    <LegalVerificationAgentProfile/>
                </Route>}
                {legalAgentLoggedInHandler && <Route path="/pending/legal-verification/" exact>
                   <AllPendingLegalVerification/>
                </Route>}
                {legalAgentLoggedInHandler && <Route path="/pending/legal-verification/:loanId">
                <FilteredPendingLegalVerificationRequest/>
                </Route>}
                
                   {/* lending tree admin profile */}
                   {lendingTreeAdminLogInHandler && <Route path="/dashboard">
                    <LendingTreeAdminProfile/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/pending-tickets" exact>
                    <AllPendingTickets/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/pending-tickets/:ticketid">
                    <IndivialTicketDetails/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/resolved-tickets" exact>
                    <AllResolvedTickets/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/resolved-tickets/:ticketId" >
                    <InidiviualResolvedTickets/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/feedbacks/" exact>
                    <ViewAllFeedbackAdmin/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/feedbacks/:feedbackId" >
                    <IndividualFeedbackDetails/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/reports" exact >
                    <Reports/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/reports/rejected/" exact >
                    <AllRejectedLoans/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/reports/rejected/:loanid" exact >
                    <ViewIndividualRejectedLoan/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/reports/new-loans/" exact >
                    <NewLoans/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/reports/new-loans/:loanId" exact >
                    <FilterNewLoan/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/reports/approved/" exact >
                    <ApprovedLoan/>
                </Route>}
                {lendingTreeAdminLogInHandler && <Route path="/reports/approved/:loanid" exact >
                    <FilterApprovedLoan/>
                </Route>}
                <Route path ="/recover/password/user">
                    <UserForgotPassword/>
                </Route>
                <Route path ="/recover/password/agent">
                    <AgentForgotPassword/>
                </Route>
                <Route path ="/recover/id/user">
                    <UserForgotId/>
                </Route>
                <Route path ="/recover/id/agent">
                    <AgentForgotId/>
                </Route>
                <Route path ="/contact">
                    <Contact/>
                </Route>
                <Route path="*">
                    <UnAuthorized />
                </Route>
            </Switch>
        </Fragment>
    )
}
export default RoutePageNavigation;